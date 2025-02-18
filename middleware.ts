import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import { NextResponse } from 'next/server';
import acceptLanguage from 'accept-language';
import { fallbackLng, languages, cookieName } from '@/app/i18n/settings';

acceptLanguage.languages(languages);

export default NextAuth(authConfig).auth;

export const config = {
	// https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
	matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$).*)'],
};

export function middleware(req: Request) {
	let lng;
	const cookies = new URL(req.url).searchParams;
	if (cookies.has(cookieName)) lng = acceptLanguage.get(cookies.get(cookieName));
	if (!lng) lng = acceptLanguage.get(req.headers.get('Accept-Language'));
	if (!lng) lng = fallbackLng;

	// Redirect if lng in path is not supported
	if (
		!languages.some(loc => new URL(req.url).pathname.startsWith(`/${loc}`)) &&
		!new URL(req.url).pathname.startsWith('/_next')
	) {
		return NextResponse.redirect(new URL(`/${lng}${new URL(req.url).pathname}`, req.url));
	}

	if (req.headers.has('referer')) {
		const referer = req.headers.get('referer');

		if (referer) {
			const refererUrl = new URL(referer);
			const lngInReferer = languages.find((l) => refererUrl.pathname.startsWith(`/${l}`));
			const response = NextResponse.next();

			if (lngInReferer) response.cookies.set(cookieName, lngInReferer);
			return response;
		}
	}

	return NextResponse.next();
}
