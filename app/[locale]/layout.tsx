import { type ReactNode } from 'react';

import { dir } from 'i18next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, unstable_setRequestLocale } from 'next-intl/server';
import { Nunito } from 'next/font/google';
import localFont from 'next/font/local';

import type { WithLocale } from '@lib/types';
import clsx from 'clsx';
import { routing } from 'i18n/routing';

import '../globals.css';

const nunito = Nunito({ subsets: ['latin', 'cyrillic-ext', 'cyrillic'] });

export const namu = localFont({
    src: [
        {
            path: '../../assets/fonts/NAMU-1400.ttf',
            weight: '400',
        },
    ],
    variable: '--font-namu',
});

interface RootLayoutProps {
    children: ReactNode;
    params: WithLocale;
}

export function generateStaticParams() {
    return routing.locales.map(locale => ({ locale }));
}

export default async function RootLayout({ children, params: { locale } }: RootLayoutProps) {
    unstable_setRequestLocale(locale);
    const messages = await getMessages();

    return (
        <html lang={locale} dir={dir(locale)}>
            <body
                className={clsx(
                    nunito.className,
                    'bg-primary-dark flex min-h-screen flex-col text-white'
                )}
            >
                <NextIntlClientProvider messages={messages}>{children}</NextIntlClientProvider>
            </body>
        </html>
    );
}
