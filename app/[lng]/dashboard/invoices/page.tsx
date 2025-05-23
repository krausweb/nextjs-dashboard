import Pagination from '@/app/ui/pagination';
import Search from '@/app/ui/search';
import Table from '@/app/ui/invoices/table';
import { CreateInvoice } from '@/app/ui/invoices/buttons';
import { lusitana } from '@/app/ui/fonts';
import { InvoicesTableSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';
import { fetchInvoicesPages } from '@/app/lib/data';
import { serverTranslation } from '@/app/i18n';

type LanguageType = Promise<{
	lng: string
}>;

export async function generateMetadata({ params }: { params: LanguageType }) {
	const { lng } = await params;
	const { t } = await serverTranslation(lng, 'dashboard');
	return { title: t('invoices') }
}

export default async function Page(
	props: {
		searchParams?: Promise<{
			query?: string;
			page?: string;
		}>,
		params: LanguageType
	}
) {
	const searchParams = await props.searchParams;
	const query = searchParams?.query || '';
	const currentPage = Number(searchParams?.page) || 1;
	const totalPages = await fetchInvoicesPages(query);
	const { lng } = await props.params;
	const { t } = await serverTranslation(lng, 'dashboard');

	return (
		<div className="w-full">
			<div className="flex w-full items-center justify-between">
				<h1 className={`${lusitana.className} text-2xl dark:text-white`}>{t('invoices')}</h1>
			</div>
			<div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
				<Search placeholder={t('search-invoices')} />
				<CreateInvoice lng={lng} />
			</div>
			<Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton lng={lng} />}>
				<Table query={query} currentPage={currentPage} lng={lng} />
			</Suspense>
			<div className="mt-5 flex w-full justify-center">
				<Pagination totalPages={totalPages} />
			</div>
		</div>
	);
}
