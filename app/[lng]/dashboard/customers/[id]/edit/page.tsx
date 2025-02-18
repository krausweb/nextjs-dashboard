import Form from '@/app/ui/customers/edit-form';
import Breadcrumbs from '@/app/ui/breadcrumbs';
import { fetchCustomerById } from '@/app/lib/data';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { serverTranslation } from '@/app/i18n';

export const metadata: Metadata = {
	title: 'Customer Edit',
};

type PageEditType = {
	id: string,
	lng: string
};

export default async function Page(props: { params: Promise<PageEditType> }) {
	const params = await props.params;
	const id = params.id;
	const customer = await fetchCustomerById(id);
	const { lng } = await props.params;
	const { t } = await serverTranslation(lng, 'dashboard');

	if (!customer) {
		notFound();
	}

	return (
		<>
			<Breadcrumbs
				breadcrumbs={[
					{ label: t('customers'), href: `/${lng}/dashboard/customers` },
					{
						label: t('edit-customer'),
						href: `/${lng}/dashboard/customers/${id}/edit`,
						active: true,
					},
				]}
			/>
			<Form customer={customer} lng={lng} />
		</>
	);
}
