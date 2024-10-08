'use server';

import prisma from '@prisma-util';

import { EventBasicInfoSelector } from '@data/events/selectors';
import type { AddEventDto, EventBasicInfo } from '@data/events/types';

const addEvent = async (dto: AddEventDto): Promise<EventBasicInfo> => {
    const { tags, ...data } = dto;

    const event = await prisma.event.create({
        data: {
            ...data,
            tags: {
                create: tags.map(id => ({ createdAt: new Date(), tag: { connect: { id } } })),
            },
        },
        select: EventBasicInfoSelector,
    });

    return event as unknown as EventBasicInfo;
};

export default addEvent;
