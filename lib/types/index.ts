import type { ReactNode } from 'react';

import type { Session } from 'next-auth';

import type uk from '@locales/uk.json';

import type { LocaleType } from '@i18n/routing';

export type MessagesType = typeof uk;

export type WithLocaleParam = {
    params: {
        locale: LocaleType;
    };
};

export type WithChildren = {
    children: ReactNode;
};

export type WithSession = {
    session: Session;
};

export type WithLocale = {
    locale: LocaleType;
};

export type PaginationDto = {
    page?: number;
    take?: number;
};
