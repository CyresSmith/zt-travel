'use server';

import type { Place } from '@prisma/client';

import prisma from '@prisma-util';

const getPlaceById = async (id: string): Promise<Place | null> => {
    try {
        return await prisma.place.findUnique({
            where: { id },
        });
    } catch (error) {
        return null;
    }
};

export default getPlaceById;
