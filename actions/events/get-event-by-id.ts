'use server';

import type { Event } from '@prisma/client';

import prisma from '@prisma-util';

const getEventById = async (id: string): Promise<Event | null> => {
    try {
        return await prisma.event.findUnique({
            where: { id },
        });
    } catch (error) {
        console.error('🚀 ~ getEventById ~ error:', error);
        return null;
    }
};

export default getEventById;
