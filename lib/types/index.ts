import type { ReactNode } from 'react';

import type { LocaleType } from '@i18n/routing';

export type WithLocale = {
    params: {
        locale: LocaleType;
    };
};

export type WithChildren = {
    children: ReactNode;
};
