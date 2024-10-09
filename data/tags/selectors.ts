import type { Prisma } from '@prisma/client';

export const TagBasicInfoSelector: Prisma.TagSelect = {
    id: true,
    name: true,
    slug: true,
};
