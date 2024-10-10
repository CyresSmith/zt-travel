import type { Prisma } from '@prisma/client';

import { TagBasicInfoSelector } from '@data/tags/selectors';

export const articleBasicInfoSelector: Prisma.ArticleSelect = {
    id: true,
    image: true,
    slug: true,
    name: true,
    desc: true,
    text: true,
    createdAt: true,
    tags: {
        select: {
            tag: { select: TagBasicInfoSelector },
        },
    },
};
