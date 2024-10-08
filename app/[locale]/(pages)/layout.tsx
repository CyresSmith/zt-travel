import { type ReactNode } from 'react';

import { unstable_setRequestLocale } from 'next-intl/server';

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

    return (
        <>
            <Header />
            <main className="flex flex-1 flex-col">{children}</main>
            <Footer />
        </>
    );
}
