import { useQuery } from '@tanstack/react-query';

import type { Tag } from '@prisma/client';

import { QUERY_KEYS } from '@keys';

import prisma from '@prisma-util';

import getTagsByType from '@actions/tags/get-tag-by-type';

export const useEventTags = () => {
    return useQuery({
        queryKey: [QUERY_KEYS.EVENT_TAGS],
        queryFn: () => getTagsByType('EVENT'),
    });
};

export const getTagsByIdsArray = async (idsArray: string[]): Promise<Tag[]> => {
    return (await prisma.tag.findMany({ where: { id: { in: idsArray } } })) || [];
};
