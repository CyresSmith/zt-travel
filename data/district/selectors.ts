import type { Prisma } from '@prisma/client';

export const DistrictBasicInfoSelector: Prisma.DistrictSelect = {
    id: true,
    name_uk: true,
    name_en: true,
    slug: true,
};
