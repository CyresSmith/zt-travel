import type { Tag, TagType } from '@prisma/client';

import prisma from '@prisma-util';

export const getTagsByType = async (type: TagType): Promise<Tag[]> => {
    return (await prisma.tag.findMany({ where: { type } })) || [];
};

export const getTagsByIdsArray = async (idsArray: string[]): Promise<Tag[]> => {
    return (await prisma.tag.findMany({ where: { id: { in: idsArray } } })) || [];
};
