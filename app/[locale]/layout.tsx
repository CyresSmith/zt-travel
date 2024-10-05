import { SessionProvider } from 'next-auth/react';
import { type ReactNode } from 'react';

import { dir } from 'i18next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, unstable_setRequestLocale } from 'next-intl/server';

import { nunito } from '@lib/fonts';
import type { WithLocaleParam } from '@lib/types';
import clsx from 'clsx';
import { setDefaultOptions } from 'date-fns';
import { enIN, uk } from 'date-fns/locale';
import { routing } from 'i18n/routing';

import '../globals.css';

import { Toaster } from '@ui/toaster';

import QueryProvider from '@components/queryProvider';

import { auth } from '@auth';

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
    const messages = await getMessages();
    const session = await auth();

    setDefaultOptions({ locale: locale === 'uk' ? uk : enIN });

    return (
        <html lang={locale} dir={dir(locale)}>
            <body className={clsx(nunito.className, 'flex min-h-screen flex-col')}>
                <NextIntlClientProvider messages={messages}>
                    <SessionProvider session={session}>
                        <QueryProvider>{children}</QueryProvider>
                    </SessionProvider>
                </NextIntlClientProvider>
                <Toaster />
            </body>
        </html>
    );
}
