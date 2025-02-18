import Form from '@/app/ui/invoices/edit-form';
import Breadcrumbs from '@/app/ui/breadcrumbs';
import { fetchCustomers, fetchInvoiceById } from '@/app/lib/data';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { serverTranslation } from '@/app/i18n';

export const metadata: Metadata = {
	title: 'Invoices Edit',
};

type PageEditType = {
	id: string, 
	lng: string
}

export default async function Page(props: { params: Promise<PageEditType> }) {
	const params = await props.params;
	const id = params.id;
	const [invoice, customers] = await Promise.all([fetchInvoiceById(id), fetchCustomers()]);

	const { lng } = await props.params;	
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
