import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
	pages: {
		signIn: '/login',
	},
	callbacks: {
		authorized({ auth, request: { nextUrl } }) {
			const isLoggedIn = !!auth?.user;
			const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
			const isOnTestPages = nextUrl.pathname.startsWith('/testpages');
			if (isOnDashboard) {
				if (isLoggedIn) return true;
				return false; // Redirect unauthenticated users to login page
			} else if (isOnTestPages) {
				if (isLoggedIn) return true;
				return false;
			} else if (isLoggedIn) {
				return Response.redirect(new URL('/dashboard', nextUrl));
			}
			return true;
		},
	},
	providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
