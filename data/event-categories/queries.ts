import type { EventCategory } from '@prisma/client';

import prisma from '@prisma-util';

export const getEventCategories = async (): Promise<EventCategory[] | null> => {
    try {
        return await prisma.eventCategory.findMany();
    } catch (error) {
        return null;
    }
};
