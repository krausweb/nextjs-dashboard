import Form from '@/app/ui/invoices/create-form';
import Breadcrumbs from '@/app/ui/breadcrumbs';
import { fetchCustomers } from '@/app/lib/data';
import type { Metadata } from 'next';
import { serverTranslation } from '@/app/i18n';

export const metadata: Metadata = {
	title: 'Invoices Create',
};

type LanguageType = {
	lng: string
};

export default async function Page(props: { params: Promise<LanguageType> }) {
	const customers = await fetchCustomers();
	const { lng } = await props.params;	
	const { t } = await serverTranslation(lng, 'dashboard');

	return (
		<>
			<Breadcrumbs
				breadcrumbs={[
					{ label: t('invoices'), href: `/${lng}/dashboard/invoices` },
					{
						label: t('create-invoice'),
						href: `/${lng}/dashboard/invoices/create`,
						active: true,
					},
				]}
			/>
			<Form customers={customers} lng={lng} />
		</>
	);
}
