import { useQuery } from '@tanstack/react-query';

import { QUERY_KEYS } from '@keys';

import { DEFAULT_STALE_TIME } from '@constants';

import getPlaceCategories from '@actions/place-categories/get-place-categiries';

export const usePlaceCategories = () => {
    return useQuery({
        queryKey: [QUERY_KEYS.PLACE_CATEGORIES],
        queryFn: getPlaceCategories,
        staleTime: DEFAULT_STALE_TIME,
    });
};
