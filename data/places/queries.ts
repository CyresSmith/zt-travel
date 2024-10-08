import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

import { QUERY_KEYS } from '@keys';

import { DEFAULT_STALE_TIME } from '@constants';

import getPlaceBySlug from '@actions/places/get-place-by-slug';
import getPlacesList from '@actions/places/get-places';
import getPopularPlaces from '@actions/places/get-popular-places';

type GetPlacesListDto = { categories: string[]; districtId?: string; communityId?: string };

export const usePlacesList = (dto?: Partial<GetPlacesListDto>) => {
    return useInfiniteQuery({
        queryKey: [QUERY_KEYS.PLACES, dto],
        queryFn: async ({ pageParam }) =>
            await getPlacesList({ pagination: { page: pageParam }, ...dto }),
        initialPageParam: 1,
        getNextPageParam: ({ page, pagesCount }) => (page < pagesCount ? page + 1 : undefined),
        getPreviousPageParam: (_firstPage, _allPages, firstPageParam) => {
            return firstPageParam <= 1 ? undefined : firstPageParam - 1;
        },
    });
};

export const usePopularPlaces = () => {
    return useQuery({
        queryKey: [QUERY_KEYS.POPULAR_PLACES],
        queryFn: getPopularPlaces,
        staleTime: DEFAULT_STALE_TIME,
    });
};

export const usePlacesBySlug = (slug: string) => {
    return useQuery({
        queryKey: [QUERY_KEYS.PLACES, { slug }],
        queryFn: async () => await getPlaceBySlug(slug),
        staleTime: DEFAULT_STALE_TIME,
    });
};
