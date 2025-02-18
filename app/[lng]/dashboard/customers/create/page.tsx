import Form from '@/app/ui/customers/create-form';
import Breadcrumbs from '@/app/ui/breadcrumbs';
import type { Metadata } from 'next';
import { serverTranslation } from '@/app/i18n';

export const metadata: Metadata = {
	title: 'Customer Create',
};

type LanguageType = {
	lng: string
};

export default async function Page(props: { params: Promise<LanguageType> }) {
	const { lng } = await props.params;	
	const { t } = await serverTranslation(lng, 'dashboard');

	return (
		<>
			<Breadcrumbs
				breadcrumbs={[
					{
						label: t('customer'),
						href: `/${lng}/dashboard/customers`,
					},
					{
						label: t('create-customer'),
						href: `/${lng}/dashboard/customer/create`,
						active: true,
					},
				]}
			/>
			<Form lng={lng} />
		</>
	);
}
