import { useQuery } from '@tanstack/react-query';

import { DEFAULT_STALE_TIME } from '@lib/constants';
import { QUERY_KEYS } from '@lib/keys';
import prisma from '@lib/prisma';
import type { Community } from '@prisma/client';

export const getCommunities = async (): Promise<Community[]> => {
    return (await prisma.community.findMany()) || [];
};

export const useCommunities = () => {
    return useQuery({
        queryKey: [QUERY_KEYS.COMMUNITIES],
        queryFn: getCommunities,
        staleTime: DEFAULT_STALE_TIME,
    });
};
