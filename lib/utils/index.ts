import { PER_PAGE } from '@lib/constants';
import { enRegex, ukRegex } from '@lib/regexps';
import type { PaginationDto } from '@lib/types';
import type { JsonObject, JsonValue } from '@prisma/client/runtime/library';
import { type ClassValue, clsx } from 'clsx';
import { setHours, setMinutes } from 'date-fns';
import { twMerge } from 'tailwind-merge';

import type { LocaleType } from '@i18n/routing';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

// export const cn = (...inputs: ClassValue[]) => clsx(inputs);

export function getPagination(dto: PaginationDto) {
    const page = dto.page || 1;
    const take = dto.take || PER_PAGE;
    const skip = (page - 1) * take;

    return { take, skip };
}

export function getLocaleValue(value: JsonValue, locale: string): string {
    return value ? ((value as JsonObject)[locale] as string) : '';
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
