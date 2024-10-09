'use server';

import type { PaginationData, PaginationDto } from '@types';

import { DEFAULT_TAKE } from '@constants';

import prisma from '@prisma-util';

import { getPagination } from '@utils';

import { EventBasicInfoSelector } from '@data/events/selectors';
import type { EventBasicInfo } from '@data/events/types';
import type { TagBasicInfo } from '@data/tags/types';

export type EventsListRes = { data: EventBasicInfo[] } & PaginationData;

type GetEventsDto = {
    pagination: PaginationDto;
    tags?: string[];
};

const getEvents = async (dto?: GetEventsDto): Promise<EventsListRes> => {
    let where = {};

    if (dto?.tags && dto.tags.length > 0) {
        where = Object.assign(where, { tags: { some: { tagId: { in: dto?.tags } } } });
    }

    const eventsData = await prisma.event.findMany({
        ...getPagination(dto?.pagination),
        select: EventBasicInfoSelector,
        where,
        orderBy: { start: 'desc' },
    });

    const count = await prisma.event.count();
    const page = dto?.pagination.page || 1;
    const take = dto?.pagination.take || DEFAULT_TAKE;
    const pagesCount = Math.max(count / take);

    const events = eventsData.map(event => ({
        ...event,
        tags: (event.tags as unknown as { tag: TagBasicInfo }[]).map(({ tag }) => tag),
    }));

    return {
        data: events,
        page,
        pagesCount,
    };
};

export default getEvents;
