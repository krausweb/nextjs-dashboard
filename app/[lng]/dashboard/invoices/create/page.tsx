import Form from '@/app/ui/invoices/create-form';
import Breadcrumbs from '@/app/ui/breadcrumbs';
import { fetchCustomers } from '@/app/lib/data';
import { serverTranslation } from '@/app/i18n';

type LanguageType = Promise<{
	lng: string
}>;

export async function generateMetadata({ params }: { params: LanguageType }) {
	const { lng } = await params;
	const { t } = await serverTranslation(lng, 'dashboard');
	return { title: t('create-invoice') }
}

export default async function Page(props: { params: LanguageType }) {
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
