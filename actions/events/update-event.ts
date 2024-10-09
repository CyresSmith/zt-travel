'use server';

import prisma from '@prisma-util';

import { filterUndefinedValues } from '@utils';

import { EventBasicInfoSelector } from '@data/events/selectors';
import type { EventBasicInfo, UpdateEventDto } from '@data/events/types';

type UpdateEventData = { id: string; data: UpdateEventDto };

const updateEvent = async ({ id, data: eventData }: UpdateEventData): Promise<EventBasicInfo> => {
    const { tags, ...rest } = eventData;

    let data = filterUndefinedValues(rest);

    if (tags && tags.length > 0) {
        await prisma.tagsOnEvents.deleteMany({ where: { eventId: id } });

        data = Object.assign(data, {
            tags: {
                create: eventData.tags?.map(id => ({
                    createdAt: new Date(),
                    tag: { connect: { id } },
                })),
            },
        });
    }

    const result = await prisma.event.update({
        where: { id },
        data,
        select: EventBasicInfoSelector,
    });

    return result as unknown as EventBasicInfo;
};

export default updateEvent;
