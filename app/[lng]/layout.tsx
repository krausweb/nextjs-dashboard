import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';
import { dir } from 'i18next'
import { languages } from '@/app/i18n/settings';
import { StoreProvider } from "./StoreProviderRedux";
import { StoreProvider as StoreProviderZustand } from "@/app/[lng]/StoreProviderZustand";
import { serverTranslation } from '@/app/i18n';

type LanguageType = Promise<{
	lng: string
}>;

export async function generateStaticParams() {
	return languages.map((lng) => ({ lng }))
}

export async function generateMetadata({ params }: { params: LanguageType }) {
	const { lng } = await params;
	const { t } = await serverTranslation(lng, 'dashboard');
	return {
		title: {
			template: t('title-main-layout-acme-dashboard'),
			default: t('title-acme-dashboard'),
		},
		description: t('description-acme-dashboard')
	}
}


export default async function RootLayout(props: {
	children: React.ReactNode,
	params: LanguageType,
}) {
	const { lng } = await props.params;
	const children = props.children;

	return (
		<StoreProvider>
			<html lang={lng} dir={dir(lng)}>
				<head>
					<script src="https://unpkg.com/react-scan/dist/auto.global.js" async />
				</head>
				<body className={`${inter.className} antialiased`}>
					<StoreProviderZustand>{children}</StoreProviderZustand>
					<div id="modal" />
				</body>
			</html>
		</StoreProvider>
	);
}
