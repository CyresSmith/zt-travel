import prisma from '@lib/prisma';
import type { PaginationDto } from '@lib/types';
import { getPagination } from '@lib/utils';
import type { Event } from '@prisma/client';

import type { EventBasicInfo } from './types';

export const getEvents = async (dto: PaginationDto): Promise<EventBasicInfo[]> => {
    const eventsData = await prisma.event.findMany({
        ...getPagination(dto),
        select: {
            id: true,
            slug: true,
            rating: true,
            image: true,
            address: true,
            desc: true,
            name: true,
            start: true,
            duration: true,
            tags: {
                select: {
                    tag: {
                        select: {
                            id: true,
                            name: true,
                        },
                    },
                },
            },
        },
    });

    const events = eventsData.map(event => ({
        ...event,
        tags: event.tags.map(tagRelation => tagRelation.tag),
    }));

    return events;
};

export const getEventById = async (id: string): Promise<Event | null> => {
    try {
        return await prisma.event.findUnique({
            where: { id },
        });
    } catch (error) {
        return null;
    }
};

export const getEventBySlug = async (slug: string): Promise<Event | null> => {
    try {
        return await prisma.event.findUnique({
            where: { slug },
        });
    } catch (error) {
        return null;
    }
};

export const getEventsByCategory = async (categoryId: string): Promise<Event[] | null> => {
    try {
        return await prisma.event.findMany({
            where: { categoryId },
        });
    } catch (error) {
        return null;
    }
};
