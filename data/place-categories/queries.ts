import { useQuery } from '@tanstack/react-query';

import { DEFAULT_STALE_TIME } from '@lib/constants';
import { QUERY_KEYS } from '@lib/keys';
import prisma from '@lib/prisma';
import type { PlaceCategory } from '@prisma/client';

export const getPlaceCategories = async (): Promise<PlaceCategory[]> => {
    return (await prisma.placeCategory.findMany()) || [];
};

export const usePlaceCategories = () => {
    return useQuery({
        queryKey: [QUERY_KEYS.PLACE_CATEGORIES],
        queryFn: getPlaceCategories,
        staleTime: DEFAULT_STALE_TIME,
    });
};
