'use client';

import { useLocale } from 'next-intl';

import type { LocaleType } from 'i18n/routing';
import { routing, usePathname, useRouter } from 'i18n/routing';

import { Button } from '@ui/button';

const LocaleSwitcher = () => {
    const router = useRouter();
    const pathname = usePathname();
    const currentLocale = useLocale();

    const handleChange = (locale: LocaleType) => router.replace(pathname, { locale });

    return (
        <ul>
            {routing.locales.map(locale => (
                <li key={locale}>
                    <Button
                        onClick={() => handleChange(locale)}
                        variant={currentLocale === locale ? 'secondary' : 'default'}
                    >
                        {locale}
                    </Button>
                </li>
            ))}
        </ul>
    );
};

export default LocaleSwitcher;
