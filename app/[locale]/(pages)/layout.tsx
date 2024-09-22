import { SessionProvider } from 'next-auth/react';

import { unstable_setRequestLocale } from 'next-intl/server';

import { auth } from '@auth';
import type { WithChildren, WithLocaleParam } from '@lib/types';

import Header from '@components/header';

import { routing } from '@i18n/routing';

export function generateStaticParams() {
    return routing.locales.map(locale => ({ locale }));
}

export default async function PagesLayout({
    children,
    params: { locale },
}: WithChildren & WithLocaleParam) {
    unstable_setRequestLocale(locale);
    const session = await auth();

    return (
        <SessionProvider session={session}>
            <Header />

            <main className="flex-1">{children}</main>
        </SessionProvider>
    );
}
