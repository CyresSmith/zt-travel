'use server';

import prisma from '@prisma-util';

import { PlaceBasicInfoSelector } from '@data/places/selectors';
import type { PlaceBasicInfo } from '@data/places/types';

const getPopularPlaces = async (): Promise<PlaceBasicInfo[]> => {
    return (
        (await prisma.place.findMany({
            select: PlaceBasicInfoSelector,
            take: 6,
            orderBy: { createdAt: 'asc' },
        })) || []
    );
};

export default getPopularPlaces;
