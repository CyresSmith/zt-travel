'use server';

import type { PaginationDto } from '@types';

import prisma from '@prisma-util';

import { getPagination } from '@utils';

import type { EventBasicInfo } from '@data/events/types';
import { TagBasicInfoSelector } from '@data/tags/selectors';

const getEvents = async (dto?: PaginationDto): Promise<EventBasicInfo[]> => {
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
                    tag: { select: TagBasicInfoSelector },
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

export default getEvents;
