import Link from 'next/link';
import { FaceFrownIcon } from '@heroicons/react/24/outline';
import { cookies } from 'next/headers'
import { serverTranslation } from '@/app/i18n';
import { fallbackLng, cookieName } from '@/app/i18n/settings';

export default async function NotFound() {
	const lng = (await cookies()).get(cookieName)?.value;
	const { t } = await serverTranslation(lng || fallbackLng, 'dashboard');

	return (
		<div className="flex h-full flex-col items-center justify-center gap-2">
			<FaceFrownIcon className="w-10 text-gray-400" />
			<h2 className="text-xl font-semibold">{t('not-found')}</h2>
			<p>{t('could-not-find-the-requested-customer')}</p>
			<Link
				href={`/${lng}/dashboard/customers`}
				className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400"
			>
				{t('go-back-customers')}
			</Link>
		</div>
	);
}