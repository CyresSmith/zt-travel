'use server';

import type { Place } from '@prisma/client';

import prisma from '@prisma-util';

const getPlacesByCategory = async (categoryId: string): Promise<Place[] | null> => {
    try {
        return await prisma.place.findMany({
            where: { categoryId },
        });
    } catch (error) {
        return null;
    }
};

export default getPlacesByCategory;
