import type { JsonObject, JsonValue } from '@prisma/client/runtime/library';
import { type ClassValue, clsx } from 'clsx';
import {
    format,
    isDate,
    millisecondsToHours,
    setDefaultOptions,
    setHours,
    setMinutes,
} from 'date-fns';
import { enIN, uk } from 'date-fns/locale';
import { twMerge } from 'tailwind-merge';

import type { InfoItem } from '@components/shared/single-item-page';

import { INFO_KEYS } from '@keys';

import type { PaginationDto, PrismaModel } from '@types';

import { DEFAULT_TAKE } from '@constants';

import { enRegex, ukRegex } from '@regexps';

import type { LocaleType } from '@i18n/routing';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

// export const cn = (...inputs: ClassValue[]) => clsx(inputs);

export function getPagination(dto?: PaginationDto) {
    const page = dto?.page || 1;
    const take = dto?.take || DEFAULT_TAKE;
    const skip = (page - 1) * take;

    return { take, skip };
}

export function getLocaleValue(value: JsonValue, locale: string): string {
    return value ? ((value as JsonObject)[locale] as string) : '';
}

export function getLocaleDate(date: Date, locale: LocaleType): string {
    return format(date, 'HH:mm PPPP', {
        locale: locale === 'uk' ? uk : enIN,
    });
}

export const checkLanguage = (text: string): LocaleType | undefined => {
    if (ukRegex.test(text)) return 'uk';
    if (enRegex.test(text)) return 'en';
    return undefined;
};

export const getFileUri = async (file: File): Promise<string> => {
    const reader = new FileReader();

    return new Promise<string>((resolve, reject) => {
        reader.onloadend = () => {
            if (reader.result) {
                resolve(reader.result.toString());
            } else {
                reject(new Error('Ошибка при чтении файла'));
            }
        };
        reader.readAsDataURL(file);
    });
};

export const getHoursAndMinutesFromString = (time: string) => {
    return time.split(':').map(str => parseInt(str, 10));
};

export const getDateWithTime = (time: string, date: Date) => {
    const [hours, minutes] = getHoursAndMinutesFromString(time);
    return setHours(setMinutes(date, minutes), hours);
};

export const filterUndefinedValues = (object: object) => {
    return Object.entries(object).reduce((acc: Record<string, unknown>, [key, value]) => {
        if (value) acc[key] = value;
        return acc;
    }, {});
};

type Selector<T> = {
    [K in keyof T]?: boolean | (T[K] extends object ? { select: Selector<T[K]> } : never);
};

export const filterObjectBySelector = <T>(obj: T, selector: Selector<T>) => {
    const result: Partial<T> = {};

    Object.keys(selector).forEach(key => {
        const typedKey = key as keyof T;
        const value = obj[typedKey];

        if (typeof selector[typedKey] === 'boolean' && selector[typedKey]) {
            result[typedKey] = value;
        } else if (
            typeof selector[typedKey] === 'object' &&
            selector[typedKey] !== null &&
            'select' in (selector[typedKey] as any)
        ) {
            result[typedKey] = filterObjectBySelector(
                value as T[keyof T],
                (selector[typedKey] as { select: Selector<T[keyof T]> }).select
            ) as T[keyof T];
        }
    });

    return result;
};

export const getSlug = (string: string) => {
    return string
        .replace(/[^a-zA-Z0-9\s]/g, '')
        .split(' ')
        .filter(Boolean)
        .join('-')
        .toLowerCase();
};

export const createQueryString = (name: string, value: string, searchParams: string) => {
    const params = new URLSearchParams(searchParams);
    params.set(name, value);

    if (name === 'district') {
        params.delete('community');
    }

    return params.toString();
};

export const getInfo = <T extends PrismaModel>(object: T, locale: LocaleType) => {
    setDefaultOptions({ locale: locale === 'uk' ? uk : enIN });

    const objectKeys = Object.keys(object);

    return INFO_KEYS.reduce((acc: InfoItem[], key) => {
        if (objectKeys.includes(key)) {
            const value: unknown = object[key as keyof object];

            if (value) {
                if (Array.isArray(value) && value.length > 0) {
                    acc.push({ icon: 'point-on-map', text: value.join(', ') });
                    return acc;
                }

                if (isDate(value)) {
                    acc.push({ icon: 'calendar-add', text: format(value, 'HH:mm, PPPP') });
                    return acc;
                }

                if (key === 'duration') {
                    acc.push({
                        icon: 'hourglass-line',
                        text: `${String(millisecondsToHours(+value))} ${locale === 'uk' ? 'год.' : 'h.'}`,
                    });
                    return acc;
                }

                if (key === 'phone') {
                    acc.push({
                        icon: 'phone-calling',
                        text: String(value),
                        href: `tel:${String(value).split(' ').join('')}`,
                    });
                    return acc;
                }

                if (key === 'email') {
                    acc.push({
                        icon: 'mailbox',
                        text: String(value),
                        href: `mailto:${String(value)}`,
                    });
                    return acc;
                }

                if (key === 'address') {
                    acc.push({
                        icon: 'streets-map-point',
                        text: getLocaleValue(value, locale),
                        href: object['gmapsUrl' as keyof object] || undefined,
                    });
                    return acc;
                }

                if (key === 'url') {
                    acc.push({
                        icon: 'feed',
                        text: String(value),
                        href: String(value),
                    });
                    return acc;
                }

                if (key === 'facebook') {
                    acc.push({
                        icon: 'facebook',
                        text: 'Facebook',
                        href: String(value),
                    });
                    return acc;
                }

                if (key === 'instagram') {
                    acc.push({
                        icon: 'instagram',
                        text: 'Instagram',
                        href: String(value),
                    });
                    return acc;
                }
            }
        }

        return acc;
    }, []);
};

export const buildUrl = (...paths: string[]) =>
    `${process.env.NEXT_PUBLIC_APP_HOST}/${paths.join('/')}`;

export const stringifyQueryParams = (params: Record<string, string>) =>
    new URLSearchParams(params).toString();
