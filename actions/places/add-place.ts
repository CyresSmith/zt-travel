'use server';

import { auth } from '@auth';
import { ResponseStatus } from '@lib/enums';
import prisma from '@lib/prisma';
import type { ActionResponse } from '@lib/types';
import { UserRole } from '@prisma/client';

import type { AddPlaceDto } from '@data/places/types';

const addPlace = async (data: AddPlaceDto): Promise<ActionResponse> => {
    try {
        const session = await auth();
        const user = session?.user;
        const role = user?.role;

        if (!user || !role || role !== UserRole.ADMIN) {
            return { status: ResponseStatus.ERROR, message: 'Forbidden' };
        }

        const result = await prisma.place.create({ data });

        if (result) {
            return { status: ResponseStatus.SUCCESS, message: 'Created' };
        } else {
            return { status: ResponseStatus.ERROR, message: 'Failed' };
        }
    } catch (error) {
        console.error('🚀 ~ addPlace ~ error:', error);
        return { status: ResponseStatus.ERROR, message: 'Something went wrong!' };
    }
};

export default addPlace;
