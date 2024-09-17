import { createSharedPathnamesNavigation } from 'next-intl/navigation';
import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
    locales: ['uk', 'en'],
    defaultLocale: 'uk',
    localePrefix: 'as-needed',
});

export type LocaleType = (typeof routing.locales)[number];

export const { Link, redirect, usePathname, useRouter } = createSharedPathnamesNavigation(routing);
