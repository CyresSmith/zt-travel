import createMiddleware from 'next-intl/middleware';
import type { NextRequest } from 'next/server';

import { auth } from 'auth';
import { routing } from 'i18n/routing';

const publicPages = ['/', '/signin'];

const handleI18nRouting = createMiddleware(routing);

const authMiddleware = auth(function onSuccess(req) {
    return handleI18nRouting(req);
});

export default function middleware(req: NextRequest) {
    const publicPathnameRegex = RegExp(
        `^(/(${routing.locales.join('|')}))?(${publicPages
            .flatMap(p => (p === '/' ? ['', '/'] : p))
            .join('|')})/?$`,
        'i'
    );

    const isPublicPage = publicPathnameRegex.test(req.nextUrl.pathname);

    if (isPublicPage) {
        return handleI18nRouting(req);
    } else {
        return authMiddleware(req);
    }
}

export const config = {
    matcher: '/((?!api|static|.*\\..*|_next).*)',
};
