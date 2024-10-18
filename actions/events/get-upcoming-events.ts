'use server';

import { DEFAULT_TAKE } from '@constants';

import prisma from '@prisma-util';

import { EventBasicInfoSelector } from '@data/events/selectors';
import type { EventBasicInfo } from '@data/events/types';
import type { TagBasicInfo } from '@data/tags/types';

const getUpcomingEvents = async (districtId?: string): Promise<EventBasicInfo[]> => {
    let where = { start: { gte: new Date() } };

    if (districtId) {
        where = Object.assign(where, { districtId });
    }

    const eventsData = await prisma.event.findMany({
        select: EventBasicInfoSelector,
        take: DEFAULT_TAKE,
        where,
        orderBy: { start: 'asc' },
    });

    const events = eventsData.map(item => ({
        ...item,
        tags: (item.tags as unknown as { tag: TagBasicInfo }[]).map(({ tag }) => tag),
    }));

    return events;
};

export default getUpcomingEvents;
