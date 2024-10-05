import { useQuery } from '@tanstack/react-query';

import { DEFAULT_STALE_TIME } from '@lib/constants';
import { QUERY_KEYS } from '@lib/keys';
import prisma from '@lib/prisma';
import type { PaginationDto } from '@lib/types';
import { getPagination } from '@lib/utils';
import type { Place } from '@prisma/client';

import { PlaceBasicInfoSelector } from './selectors';
import type { PlaceBasicInfo } from './types';

export const getPlaces = async (dto?: PaginationDto): Promise<PlaceBasicInfo[]> => {
    return (
        (await prisma.place.findMany({
            ...getPagination(dto),
            select: PlaceBasicInfoSelector,
        })) || []
    );
};

export const usePlaces = (dto?: PaginationDto) => {
    return useQuery({
        queryKey: [QUERY_KEYS.PLACES, dto],
        queryFn: async () => await getPlaces(dto),
        staleTime: DEFAULT_STALE_TIME,
    });
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

export const usePlacesBySlug = (slug: string) => {
    return useQuery({
        queryKey: [QUERY_KEYS.PLACES, { slug }],
        queryFn: async () => await getPlaceBySlug(slug),
        staleTime: DEFAULT_STALE_TIME,
    });
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
