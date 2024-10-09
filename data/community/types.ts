import type { Community } from '@prisma/client';

export type CommunityBasicInfo = Pick<Community, 'id' | 'name_en' | 'name_uk' | 'districtId'>;
