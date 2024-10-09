'use server';

import type { Tag, TagType } from '@prisma/client';

import prisma from '@prisma-util';

const getTagsByType = async (type: TagType): Promise<Tag[]> => {
    return (await prisma.tag.findMany({ where: { type } })) || [];
};

export default getTagsByType;
