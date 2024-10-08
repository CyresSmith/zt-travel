'use server';

import { DEFAULT_TAKE } from '@constants';

import prisma from '@prisma-util';

import { EventBasicInfoSelector } from '@data/events/selectors';
import type { EventBasicInfo } from '@data/events/types';
import type { TagBasicInfo } from '@data/tags/types';

const getUpcomingEvents = async (): Promise<EventBasicInfo[]> => {
    const eventsData = await prisma.event.findMany({
        select: EventBasicInfoSelector,
        take: DEFAULT_TAKE,
        where: { start: { gte: new Date() } },
        orderBy: { start: 'asc' },
    });

    const events = eventsData.map(item => ({
        ...item,
        tags: (item.tags as unknown as { tag: TagBasicInfo }[]).map(({ tag }) => tag),
    }));

    return events;
};

export default getUpcomingEvents;
