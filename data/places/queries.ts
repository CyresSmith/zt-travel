import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

import { QUERY_KEYS } from '@keys';

import type { PaginationDto } from '@types';

import { DEFAULT_STALE_TIME } from '@constants';

import getPlaceBySlug from '@actions/places/get-place-by-slug';
import getPlacesList from '@actions/places/get-places';
import getPopularPlaces from '@actions/places/get-popular-places';

export const usePlacesList = (dto: {
    categories?: string[];
    districtId?: string;
    communityId?: string;
}) => {
    let queryKey: string[] = [QUERY_KEYS.PLACES];

    if (dto.categories && dto.categories.length > 0) {
        queryKey = [...queryKey, ...dto.categories];
    }

    if (dto.districtId) {
        queryKey = [...queryKey, dto.districtId];
    }

    if (dto.communityId) {
        queryKey = [...queryKey, dto.communityId];
    }

    const getDto = (pageParam: number) => {
        let params: {
            categories?: string[];
            districtId?: string;
            communityId?: string;
            pagination: PaginationDto;
        } = {
            pagination: { page: pageParam },
        };

        if (dto.categories && dto.categories.length > 0) {
            params = Object.assign(params, { categories: dto.categories });
        }

        if (dto.districtId) {
            params = Object.assign(params, { districtId: dto.districtId });
        }

        if (dto.communityId) {
            params = Object.assign(params, { communityId: dto.communityId });
        }

        return params;
    };

    return useInfiniteQuery({
        queryKey,
        queryFn: async ({ pageParam }) => await getPlacesList(getDto(pageParam)),
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
