'use client'

/**
 * Not used for NextJS App Router
 * 
 * This is an example page if we need to implement Language Switcher 
 * for the NextJS Pages Router approach
 */

import { useTranslation } from 'react-i18next';

export default function LanguageSwitcher() {
	const { i18n } = useTranslation();
	const changeLanguage = (lng: string) => {
		i18n.changeLanguage(lng);
	}

	const lngs: Record<string, { nativeName: string }> = {
		en: { nativeName: 'English' },
		ua: { nativeName: 'Українська' }
	};

	return (
		<>
			{Object.keys(lngs).map((lng) => (
				<button className={`${(lng === i18n.resolvedLanguage) ? 'bg-gray-600' : 'bg-blue-600 hover:bg-blue-500'}
					h-10 rounded-lg px-4 text-sm font-medium text-white transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600`}
					type="submit" key={lng} disabled={i18n.resolvedLanguage === lng}
					onClick={() => changeLanguage(lng)}
				>{lngs[lng].nativeName}</button>
			))}
		</>
	)
}
