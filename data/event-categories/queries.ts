import prisma from '@lib/prisma';
import type { EventCategory } from '@prisma/client';

export const getEventCategories = async (): Promise<EventCategory[] | null> => {
    try {
        return await prisma.eventCategory.findMany();
    } catch (error) {
        return null;
    }
};
