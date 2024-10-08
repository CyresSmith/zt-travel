'use server';

import type { PaginationDto } from '@types';

import prisma from '@prisma-util';

import { getPagination } from '@utils';

import { EventBasicInfoSelector } from '@data/events/selectors';
import type { EventBasicInfo } from '@data/events/types';

const getEvents = async (dto?: PaginationDto): Promise<EventBasicInfo[]> => {
    const eventsData = await prisma.event.findMany({
        ...getPagination(dto),
        select: EventBasicInfoSelector,
    });

    const events = eventsData.map(event => ({
        ...event,
        tags: event.tags.map(tagRelation => tagRelation.tag),
    }));

    return events;
};

export default getEvents;
