import { useQuery } from '@tanstack/react-query';

import { DEFAULT_STALE_TIME } from '@lib/constants';
import { QUERY_KEYS } from '@lib/keys';
import prisma from '@lib/prisma';
import type { District } from '@prisma/client';

export const getDistricts = async (): Promise<Pick<District, 'id' | 'name_en' | 'name_uk'>[]> => {
    return (
        (await prisma.district.findMany({ select: { id: true, name_en: true, name_uk: true } })) ||
        []
    );
};

export const useDistricts = () => {
    return useQuery({
        queryKey: [QUERY_KEYS.DISTRICTS],
        queryFn: getDistricts,
        staleTime: DEFAULT_STALE_TIME,
    });
};
