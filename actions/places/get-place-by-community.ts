'use server';

import type { Place } from '@prisma/client';

import prisma from '@prisma-util';

const getPlacesByCommunity = async (communityId: string): Promise<Place[] | null> => {
    try {
        return await prisma.place.findMany({
            where: { communityId },
        });
    } catch (error) {
        return null;
    }
};

export default getPlacesByCommunity;
