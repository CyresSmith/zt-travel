import type { ReactNode } from 'react';

import type { Session } from 'next-auth';

import type { ResponseStatus } from '@lib/enums';

import type { LocaleType } from '@i18n/routing';

import type uk from '@locales/uk.json';

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

export type StringWithLocales = {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    [key in LocaleType]: string;
};

export type ActionResponse = {
    status: ResponseStatus;
    message?: string;
    data?: unknown;
};
