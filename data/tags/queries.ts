import { useQuery } from '@tanstack/react-query';

import { type Tag, TagType } from '@prisma/client';

import { QUERY_KEYS } from '@keys';

import prisma from '@prisma-util';

import getTagsByType from '@actions/tags/get-tag-by-type';

export const useEventTags = () => {
    return useQuery({
        queryKey: [QUERY_KEYS.EVENT_TAGS],
        queryFn: () => getTagsByType(TagType.EVENT),
    });
};

export const useArticleTags = () => {
    return useQuery({
        queryKey: [QUERY_KEYS.ARTICLE_TAGS],
        queryFn: () => getTagsByType(TagType.ARTICLE),
    });
};

export const getTagsByIdsArray = async (idsArray: string[]): Promise<Tag[]> => {
    return (await prisma.tag.findMany({ where: { id: { in: idsArray } } })) || [];
};
