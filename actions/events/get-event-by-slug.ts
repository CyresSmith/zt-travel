'use server';

import type { Event } from '@prisma/client';

import prisma from '@prisma-util';

import { EventBasicInfoSelector } from '@data/events/selectors';
import { EventBasicInfo } from '@data/events/types';
import { TagBasicInfo } from '@data/tags/types';

const getEventBySlug = async (
    slug: string
): Promise<(Event & { similar: EventBasicInfo[] }) | null> => {
    try {
        const event = await prisma.event.findUnique({
            where: { slug },
        });

        if (!event) return null;

        const tags = (
            (await prisma.tagsOnEvents.findMany({ where: { eventId: event?.id } })) || []
        )?.map(({ tagId }) => tagId);

        const similar = await prisma.event.findMany({
            where: { tags: { some: { tagId: { in: tags }, eventId: { not: event.id } } } },
            select: EventBasicInfoSelector,
            take: 6,
            orderBy: { createdAt: 'desc' },
        });

        return {
            ...event,
            similar:
                (similar.map(item => ({
                    ...item,
                    tags: (item.tags as unknown as { tag: TagBasicInfo }[]).map(({ tag }) => tag),
                })) as unknown as EventBasicInfo[]) || [],
        };
    } catch (error) {
        console.error('🚀 ~ getEventBySlug ~ error:', error);
        return null;
    }
};

export default getEventBySlug;
