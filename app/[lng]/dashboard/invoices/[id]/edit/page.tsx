import Form from '@/app/ui/invoices/edit-form';
import Breadcrumbs from '@/app/ui/breadcrumbs';
import { fetchCustomers, fetchInvoiceById } from '@/app/lib/data';
import { notFound } from 'next/navigation';
import { serverTranslation } from '@/app/i18n';

type LanguageType = Promise<{
	lng: string
}>;

type PageEditType = {
	params: Promise<{
		id: string,
		lng: string,
	}>
};

export async function generateMetadata({ params }: { params: LanguageType }) {
	const { lng } = await params;
	const { t } = await serverTranslation(lng, 'dashboard');
	return { title: t('edit-invoice') }
}

export default async function Page({ params }: PageEditType) {
	const { id, lng } = await params;
	const [invoice, customers] = await Promise.all([fetchInvoiceById(id), fetchCustomers()]);
	const { t } = await serverTranslation(lng, 'dashboard');

	if (!invoice) {
		notFound();
	}

	return (
		<>
			<Breadcrumbs
				breadcrumbs={[
					{ label: t('invoices'), href: `/${lng}/dashboard/invoices` },
					{
						label: t('edit-invoice'),
						href: `/${lng}/dashboard/invoices/${id}/edit`,
						active: true,
					},
				]}
			/>
			<Form invoice={invoice} customers={customers} lng={lng} />
		</>
	);
}
