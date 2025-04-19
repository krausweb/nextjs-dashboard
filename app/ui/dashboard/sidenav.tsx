import Link from 'next/link';
import NavLinks from '@/app/ui/dashboard/nav-links-dashboard';
import AcmeLogo from '@/app/ui/acme-logo';
import LanguageSwitcher from '@/app/ui/language-switcher';
import { PowerIcon, FireIcon } from '@heroicons/react/24/outline';
import { signOut } from '@/auth';
import { serverTranslation } from '@/app/i18n';

type LanguageType = {
	lng: string
};

export default async function SideNav({ lng }: LanguageType) {
	const { t } = await serverTranslation(lng, 'dashboard');

	return (
		<nav className="flex h-full flex-col px-3 py-4 md:px-2">
			<div className="flex items-center justify-between mb-2">
				<LanguageSwitcher lng={lng} />
			</div>
			<Link className="mb-2 flex h-20 items-end justify-start rounded-md bg-blue-600 p-4 md:h-40" href={`/${lng}/`}>
				<div className="w-32 text-white md:w-40">
					<AcmeLogo />
				</div>
			</Link>
			<div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
				<NavLinks lng={lng} />
				<div className="hidden h-auto w-full grow rounded-md bg-gray-100 md:block"></div>
				<Link
					href={`/${lng}/demo-components`}
					className="flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-100 p-3 text-sm font-medium my-1
						hover:bg-sky-100 hover:text-blue-600
						md:flex-none md:justify-start md:p-2 md:px-3 md:my-0"
				>
					<FireIcon className="w-6" />
					<p className="hidden md:block">{t('components')}</p>
				</Link>
				<aside>
					<form
						action={async () => {
							'use server';
							await signOut({ redirectTo: `/${lng}/` });
						}}
					>
						<button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-100 p-3 text-sm font-medium my-1
							hover:bg-sky-100 hover:text-blue-600
							md:flex-none md:justify-start md:p-2 md:px-3 md:my-0">
							<PowerIcon className="w-6" />
							<div className="hidden md:block">{t('sign-out')}</div>
						</button>
					</form>
				</aside>
			</div>
		</nav>
	);
}
