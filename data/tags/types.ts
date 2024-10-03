import type { Tag } from '@prisma/client';

export type TagBasicInfo = Pick<Tag, 'id' | 'name'>;
