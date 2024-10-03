import prisma from '@lib/prisma';
import type { PaginationDto } from '@lib/types';
import { getPagination } from '@lib/utils';
import type { Place } from '@prisma/client';

import type { PlaceBasicInfo } from './types';

export const getPlaces = async (dto: PaginationDto): Promise<PlaceBasicInfo[]> => {
    try {
        return (
            (await prisma.place.findMany({
                ...getPagination(dto),
                select: {
                    id: true,
                    slug: true,
                    rating: true,
                    image: true,
                    gmapsUrl: true,
                    address: true,
                    desc: true,
                    name: true,
                    category: { select: { id: true, name: true, slug: true } },
                },
            })) || []
        );
    } catch (error) {
        return [];
    }
};

export const getPlaceById = async (id: string): Promise<Place | null> => {
    try {
        return await prisma.place.findUnique({
            where: { id },
        });
    } catch (error) {
        return null;
    }
};

export const getPlaceBySlug = async (slug: string): Promise<Place | null> => {
    try {
        return await prisma.place.findUnique({
            where: { slug },
        });
    } catch (error) {
        return null;
    }
};

export const getPlacesByCategory = async (categoryId: string): Promise<Place[] | null> => {
    try {
        return await prisma.place.findMany({
            where: { categoryId },
        });
    } catch (error) {
        return null;
    }
};

export const getPlacesByCommunity = async (communityId: string): Promise<Place[] | null> => {
    try {
        return await prisma.place.findMany({
            where: { communityId },
        });
    } catch (error) {
        return null;
    }
};
