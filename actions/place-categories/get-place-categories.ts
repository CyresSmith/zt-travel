'use server';

import type { PlaceCategory } from '@prisma/client';

import prisma from '@prisma-util';

const getPlaceCategories = async (): Promise<PlaceCategory[]> => {
    return (await prisma.placeCategory.findMany()) || [];
};

export default getPlaceCategories;
