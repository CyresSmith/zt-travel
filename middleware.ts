import createMiddleware from 'next-intl/middleware';

import { auth } from '@auth';
import {
    DEFAULT_SIGN_IN_REDIRECT,
    SIGN_IN_REDIRECT,
    adminRoutes,
    apiPrefix,
    authRoutes,
    protectedRoutes,
} from '@lib/routes/index.ts';

import { routing } from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

export default auth(req => {
    const { nextUrl } = req;
    const { pathname } = nextUrl;

    const isLoggedIn = !!req.auth;
    const isAdmin = req.auth?.user.role === 'ADMIN';

    const isApiRoute = pathname.startsWith(apiPrefix);
    const isProtectedRoute = protectedRoutes.includes(pathname);
    const isAdminRoute = adminRoutes.includes(pathname);
    const isAuthRoute = authRoutes.includes(pathname);

    if (isApiRoute) return;

    if (isAuthRoute && isLoggedIn) {
        return Response.redirect(new URL(DEFAULT_SIGN_IN_REDIRECT, nextUrl));
    }

    if (!isAdmin && isAdminRoute) {
        return Response.redirect(
            new URL(!isLoggedIn ? SIGN_IN_REDIRECT : DEFAULT_SIGN_IN_REDIRECT, nextUrl)
        );
    }

    if (!isLoggedIn && isProtectedRoute) {
        return Response.redirect(new URL(SIGN_IN_REDIRECT, nextUrl));
    }

    return intlMiddleware(req);
});

export const config = {
    matcher: ['/((?!api|trpc|static|assets|_next|.*\\..*).*)', '/', '/(api|trpc)(.*)'],
};
