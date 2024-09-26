import prisma from '@lib/prisma';
import type { PlaceCategory } from '@prisma/client';

export const getPlaceCategories = async (): Promise<PlaceCategory[] | null> => {
    try {
        return await prisma.placeCategory.findMany();
    } catch (error) {
        return null;
    }
};
