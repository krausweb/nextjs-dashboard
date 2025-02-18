import Pagination from '@/app/ui/pagination';
import Search from '@/app/ui/search';
import Table from '@/app/ui/customers/table';
import { CreateCustomer } from '@/app/ui/customers/buttons';
import { lusitana } from '@/app/ui/fonts';
import { InvoicesTableSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';
import { fetchCustomersPages } from '@/app/lib/data';
import type { Metadata } from 'next';
import { serverTranslation } from '@/app/i18n';

export const metadata: Metadata = {
	title: 'Customers',
};

type LanguageType = {
	lng: string
};

export default async function Page(
	props: {
		searchParams?: Promise<{
			query?: string;
			page?: string;
		}>,
		params: Promise<LanguageType>
	}
) {
	const searchParams = await props.searchParams;
	const query = searchParams?.query || '';
	const currentPage = Number(searchParams?.page) || 1;
	const totalPages = await fetchCustomersPages(query);
	const { lng } = await props.params;	
	const { t } = await serverTranslation(lng, 'dashboard');

	return (
		<div className="w-full">
			<div className="flex w-full items-center justify-between">
				<h1 className={`${lusitana.className} text-2xl`}>{t('customers')}</h1>
			</div>
			<div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
				<Search placeholder={t('search-customers')} />
				<CreateCustomer lng={lng} />
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
