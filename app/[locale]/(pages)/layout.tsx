import { SessionProvider } from 'next-auth/react';
import { type ReactNode } from 'react';

import { unstable_setRequestLocale } from 'next-intl/server';

import { auth } from '@auth';
import type { WithLocaleParam } from '@lib/types';
import { routing } from 'i18n/routing';

import Footer from '@components/footer';
import Header from '@components/header';

interface RootLayoutProps {
    children: ReactNode;
}

export function generateStaticParams() {
    return routing.locales.map(locale => ({ locale }));
}

export default async function RootLayout({
    children,
    params: { locale },
}: RootLayoutProps & WithLocaleParam) {
    unstable_setRequestLocale(locale);
    const session = await auth();

    return (
        <SessionProvider session={session}>
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
        </SessionProvider>
    );
}
