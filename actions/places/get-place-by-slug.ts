'use server';

import type { Place } from '@prisma/client';

import prisma from '@prisma-util';

import { PlaceBasicInfoSelector } from '@data/places/selectors';
import type { PlaceBasicInfo } from '@data/places/types';

const getPlaceBySlug = async (
    slug: string
): Promise<(Place & { similar: PlaceBasicInfo[] }) | null> => {
    try {
        const place = await prisma.place.findUnique({
            where: { slug },
        });

        if (!place) return null;

        const similar = await prisma.place.findMany({
            where: { categoryId: place?.categoryId, id: { not: place.id } },
            select: PlaceBasicInfoSelector,
            take: 6,
            orderBy: { createdAt: 'desc' },
        });

        return { ...place, similar };
    } catch (error) {
        return null;
    }
};

export default getPlaceBySlug;
