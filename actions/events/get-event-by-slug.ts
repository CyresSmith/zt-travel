'use server';

import type { Event } from '@prisma/client';

import prisma from '@prisma-util';

const getEventBySlug = async (slug: string): Promise<Event | null> => {
    try {
        return await prisma.event.findUnique({
            where: { slug },
        });
    } catch (error) {
        console.error('🚀 ~ getEventBySlug ~ error:', error);
        return null;
    }
};

export default getEventBySlug;
