import prisma from '@lib/prisma';
import type { PaginationDto, WithLocale } from '@lib/types';
import { getPagination } from '@lib/utils';

import type { PlaceBasicInfo, PlaceWithText } from './types';

export const getPlaces = async (
    dto: PaginationDto & Partial<WithLocale>
): Promise<PlaceBasicInfo[] | null> => {
    const { locale = 'uk', ...rest } = dto;

    try {
        return await prisma.place.findMany({
            ...getPagination(rest),
            select: {
                id: true,
                slug: true,
                rating: true,
                image: true,
                gmapsUrl: true,
                placeText: {
                    where: { locale },
                    select: { address: true, desc: true, name: true },
                },
            },
        });
    } catch (error) {
        return null;
    }
};

export const getPlaceById = async (
    dto: { id: string } & Partial<WithLocale>
): Promise<PlaceWithText | null> => {
    const { id, locale = 'uk' } = dto;

    try {
        return await prisma.place.findUnique({
            where: { id },
            include: {
                placeText: { where: { locale }, select: { address: true, name: true, desc: true } },
            },
        });
    } catch (error) {
        return null;
    }
};

export const getPlaceBySlug = async (
    dto: { slug: string } & Partial<WithLocale>
): Promise<PlaceWithText | null> => {
    const { slug, locale = 'uk' } = dto;

    try {
        return await prisma.place.findUnique({
            where: { slug },
            include: {
                placeText: { where: { locale }, select: { address: true, name: true, desc: true } },
            },
        });
    } catch (error) {
        return null;
    }
};

export const getPlacesByCategory = async (
    dto: { categoryId: string } & WithLocale
): Promise<PlaceWithText[] | null> => {
    const { categoryId, locale } = dto;

    try {
        return await prisma.place.findMany({
            where: { categoryId },
            include: {
                placeText: { where: { locale }, select: { address: true, name: true, desc: true } },
            },
        });
    } catch (error) {
        return null;
    }
};

export const getPlacesByCommunity = async (dto: { communityId: string } & WithLocale) => {
    const { communityId, locale } = dto;

    try {
        return await prisma.place.findMany({
            where: { communityId },
            include: {
                placeText: { where: { locale }, select: { address: true, name: true, desc: true } },
            },
        });
    } catch (error) {
        return null;
    }
};
