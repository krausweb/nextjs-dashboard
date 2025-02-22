import Form from '@/app/ui/customers/edit-form';
import Breadcrumbs from '@/app/ui/breadcrumbs';
import { fetchCustomerById } from '@/app/lib/data';
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
	return { title: t('edit-customer') }
}

export default async function Page({ params }: PageEditType) {
	const { id, lng } = await params;
	const customer = await fetchCustomerById(id);
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
