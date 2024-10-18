import type { District } from '@prisma/client';

export type DistrictBasicInfo = Pick<District, 'id' | 'name_en' | 'name_uk' | 'slug'>;
