import type { Prisma } from '@prisma/client';

export const PlaceBasicInfoSelector: Prisma.PlaceSelect = {
    id: true,
    image: true,
    rating: true,
    slug: true,
    gmapsUrl: true,
    name: true,
    address: true,
    desc: true,
    category: { select: { id: true, name: true, slug: true } },
};
