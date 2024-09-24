import { SessionProvider } from 'next-auth/react';

import { unstable_setRequestLocale } from 'next-intl/server';

import { auth } from '@auth';
import type { WithChildren, WithLocaleParam } from '@lib/types';

import Header from '@components/header';

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
