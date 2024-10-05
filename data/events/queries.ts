import { useQuery } from '@tanstack/react-query';

import { DEFAULT_STALE_TIME } from '@lib/constants';
import { QUERY_KEYS } from '@lib/keys';
import prisma from '@lib/prisma';
import type { PaginationDto } from '@lib/types';
import { getPagination } from '@lib/utils';
import type { Event } from '@prisma/client';

import type { EventBasicInfo } from './types';

import { TagBasicInfoSelector } from '@data/tags/selectors';

export const getEvents = async (dto?: PaginationDto): Promise<EventBasicInfo[]> => {
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
                    tag: TagBasicInfoSelector,
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

export const useEvents = (dto?: PaginationDto) => {
    return useQuery({
        queryKey: [QUERY_KEYS.EVENTS, dto],
        queryFn: async () => await getEvents(dto),
        staleTime: DEFAULT_STALE_TIME,
    });
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

export const getEventsByTagId = async (tagId: string): Promise<Event[] | null> => {
    try {
        return await prisma.event.findMany({
            where: { tags: { some: { tagId } } },
        });
    } catch (error) {
        return null;
    }
};
