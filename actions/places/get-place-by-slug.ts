'use server';

import type { Place } from '@prisma/client';

import prisma from '@prisma-util';

const getPlaceBySlug = async (slug: string): Promise<Place | null> => {
    try {
        return await prisma.place.findUnique({
            where: { slug },
        });
    } catch (error) {
        return null;
    }
};

export default getPlaceBySlug;
