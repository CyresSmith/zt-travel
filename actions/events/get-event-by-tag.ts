'use server';

import type { Event } from '@prisma/client';

import prisma from '@prisma-util';

const getEventsByTagId = async (tagId: string): Promise<Event[] | null> => {
    try {
        return await prisma.event.findMany({
            where: { tags: { some: { tagId } } },
        });
    } catch (error) {
        console.error('🚀 ~ getEventsByTagId ~ error:', error);
        return null;
    }
};

export default getEventsByTagId;
