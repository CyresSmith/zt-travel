import createMiddleware from 'next-intl/middleware';

import { auth } from '@auth';
import { SIGN_IN_REDIRECT, apiPrefix, protectedRoutes } from '@lib/routes';

import { routing } from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

export default auth(req => {
    const { nextUrl } = req;
    const { pathname } = nextUrl;

    const isLoggedIn = !!req.auth;

    const isApiRoute = pathname.startsWith(apiPrefix);
    const isProtectedRoute = protectedRoutes.includes(pathname);

    if (isApiRoute) return;

    if (!isLoggedIn && isProtectedRoute) {
        return Response.redirect(new URL(SIGN_IN_REDIRECT, nextUrl));
    }

    return intlMiddleware(req);
});

export const config = {
    matcher: ['/((?!api|trpc|static|assets|_next|.*\\..*).*)', '/', '/(api|trpc)(.*)'],
};
