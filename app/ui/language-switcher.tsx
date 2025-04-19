'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { languages } from '@/app/i18n/settings';
import { useTranslation } from '../i18n/client';

export default function LanguageSwitcher({ lng }: { lng: string }) {
	const localpath = usePathname();
	const localpathWithoutLng = localpath.slice(3);
	const { t } = useTranslation(lng);

	return (
		<section>
			{languages.map((l, index) => {
				return (
					<span key={l} className='dark:color-white' >
						{index > 0 && (` ${t('or')} `)}

						{
							lng === l ? (
								<span className="bg-gray-600 inline-flex place-items-center h-10 rounded-lg px-4 text-sm font-medium text-white transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
									{l}
								</span>
							) : (
								<Link className="bg-blue-600 hover:bg-blue-500 inline-flex place-items-center h-10 rounded-lg px-4 text-sm font-medium text-white transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
									href={`/${l}${localpathWithoutLng}`}>
									{l}
								</Link>
							)
						}
					</span>
				)
			})}
		</section>
	)
}
