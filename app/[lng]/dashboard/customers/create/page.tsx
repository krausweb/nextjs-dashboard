import Form from '@/app/ui/customers/create-form';
import Breadcrumbs from '@/app/ui/breadcrumbs';
import { serverTranslation } from '@/app/i18n';

type LanguageType = Promise<{
	lng: string
}>;

export async function generateMetadata({ params }: { params: LanguageType }) {
	const { lng } = await params;
	const { t } = await serverTranslation(lng, 'dashboard');
	return { title: t('create-customer') }
}

export default async function Page({ params }: { params: LanguageType }) {
	const { lng } = await params;
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
