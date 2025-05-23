import { createInstance } from 'i18next';
import resourcesToBackend from 'i18next-resources-to-backend';
import { initReactI18next } from 'react-i18next/initReactI18next';
import { getOptions } from './settings';

const initI18next = async (lng: string, ns?: string) => {
	const i18nInstance = createInstance()
	await i18nInstance
		.use(initReactI18next)
		.use(resourcesToBackend((language: string, namespace: string) => import(`./locales/${language}/${namespace}.json`)))
		.init(getOptions(lng, ns))
	return i18nInstance
}

// avoid to use "use" naming inside Server components to work without ESLINT warnings and "desable-next-line"
export async function serverTranslation(lng: string, ns?: string, options: object = {}) {
	const i18nextInstance = await initI18next(lng, ns)
	return {
		t: i18nextInstance.getFixedT(lng, Array.isArray(ns) ? ns[0] : ns, (options as { keyPrefix?: string }).keyPrefix),
		i18n: i18nextInstance
	}
}
