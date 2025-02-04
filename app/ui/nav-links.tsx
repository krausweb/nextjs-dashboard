'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import {
	FireIcon // by default
} from '@heroicons/react/24/outline';

interface NavLinkListType {
	links: NavLink[]
}

interface NavLink {
	name: string;
	href: string;
	icon?: React.ElementType;
}

// Map of links to display in the side navigation
export default function NavLinks({ links }: NavLinkListType) {
	const pathname = usePathname();

	return (
		<>
			{links.map((link) => {
				const LinkIcon = link.icon || FireIcon;
				return (
					<Link
						key={link.href}
						href={link.href}
						className={clsx(
							'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3',
							{
								'bg-blue-100 text-blue-600': pathname === link.href,
							}
						)}
					>
						<LinkIcon className="w-6" />
						<p className="hidden md:block">{link.name}</p>
					</Link>
				);
			})}
		</>
	);
}
