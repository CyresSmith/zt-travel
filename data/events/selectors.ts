import type { Prisma } from '@prisma/client';

import { TagBasicInfoSelector } from '@data/tags/selectors';

export const EventBasicInfoSelector: Prisma.EventSelect = {
    id: true,
    image: true,
    rating: true,
    slug: true,
    name: true,
    address: true,
    desc: true,
    start: true,
    duration: true,
    tags: {
        select: {
            tag: { select: TagBasicInfoSelector },
        },
    },
};
