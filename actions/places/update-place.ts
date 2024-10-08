'use server';

import type { Place, PlaceCategory } from '@prisma/client';
import { UserRole } from '@prisma/client';

import prisma from '@prisma-util';

import { auth } from '@auth';

import type { UpdatePlaceData } from '@data/places/types';

const updatePlace = async ({
    id,
    data,
}: UpdatePlaceData): Promise<Place & { category: Pick<PlaceCategory, 'id' | 'name' | 'slug'> }> => {
    const session = await auth();
    const user = session?.user;
    const role = user?.role;

    if (!user || !role || role !== UserRole.ADMIN) {
        throw new Error('Forbidden');
    }

    return await prisma.place.update({
        where: { id },
        data,
        include: { category: { select: { id: true, name: true, slug: true } } },
    });
};

export default updatePlace;
