import { JsonObject, JsonValue } from '@prisma/client/runtime/library';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { PER_PAGE } from './constants';
import type { PaginationDto } from './types';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function getPagination(dto: PaginationDto) {
    const page = dto.page || 1;
    const take = dto.take || PER_PAGE;
    const skip = (page - 1) * take;

    return { take, skip };
}

export function getLocaleValue(value: JsonValue, locale: string): string {
    return (value as JsonObject)[locale] as string;
}
