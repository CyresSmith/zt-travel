import type { Prisma } from '@prisma/client';

export const CommunityBasicInfoSelector: Prisma.CommunitySelect = {
    id: true,
    name_uk: true,
    name_en: true,
    districtId: true,
};
