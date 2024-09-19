import { SessionProvider } from 'next-auth/react';

import { unstable_setRequestLocale } from 'next-intl/server';

import { auth } from '@auth';
import type { WithChildren, WithLocale } from '@lib/types';

import Container from '@components/container';
import Header from '@components/header';

import { routing } from '@i18n/routing';

export function generateStaticParams() {
    return routing.locales.map(locale => ({ locale }));
}

export default async function RootLayout({
    children,
    params: { locale },
}: WithChildren & WithLocale) {
    unstable_setRequestLocale(locale);
    const session = await auth();

    return (
        <SessionProvider session={session}>
            <Header params={{ locale }} />
            <main>
                <Container>{children}</Container>
            </main>
        </SessionProvider>
    );
}
