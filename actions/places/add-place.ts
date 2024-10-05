'use server';

import prisma from '@lib/prisma';

import { PlaceBasicInfoSelector } from '@data/places/selectors';
import type { AddPlaceDto, PlaceBasicInfo } from '@data/places/types';

const addPlace = async (data: AddPlaceDto): Promise<PlaceBasicInfo> => {
    const place = prisma.place.create({
        data,
        select: PlaceBasicInfoSelector,
    });

    return place;
};

export default addPlace;
