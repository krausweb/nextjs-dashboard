import Link from 'next/link';
import { FaceFrownIcon } from '@heroicons/react/24/outline';

import { headers } from 'next/headers'
import { serverTranslation } from '@/app/i18n';
import { fallbackLng, cookieName, languages } from '@/app/i18n/settings';

// import acceptLanguage from 'accept-language';
// acceptLanguage.languages(languages);

export default async function NotFound() {
	const headersList = await headers();
	let lng = null; // const lng = acceptLanguage.get(headersList.get('Accept-Language')); doesn't work properly(
	const cookieLngShortestInfo = headersList.get('cookie');
	if (cookieLngShortestInfo !== "") {
		const match = cookieLngShortestInfo?.match(`${cookieName}=([^;]+)`);
		lng = match ? match[1] : null;
	}	
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