import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

import { QUERY_KEYS } from '@keys';

import type { PaginationDto } from '@types';

import getEvents from '@actions/events/get-events';
import getUpcomingEvents from '@actions/events/get-upcoming-events';

export const useEventsList = (dto: {
    tags?: string[];
    districtId?: string;
    communityId?: string;
}) => {
    let queryKey: string[] = [QUERY_KEYS.EVENTS];

    if (dto.tags && dto.tags.length > 0) {
        queryKey = [...queryKey, ...dto.tags];
    }

    if (dto.districtId) {
        queryKey = [...queryKey, dto.districtId];
    }

    if (dto.communityId) {
        queryKey = [...queryKey, dto.communityId];
    }

    const getDto = (pageParam: number) => {
        let params: {
            tags?: string[];
            districtId?: string;
            communityId?: string;
            pagination: PaginationDto;
        } = {
            pagination: { page: pageParam },
        };

        if (dto.tags && dto.tags.length > 0) {
            params = Object.assign(params, { tags: dto.tags });
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
        queryFn: async ({ pageParam }) => await getEvents(getDto(pageParam)),
        initialPageParam: 1,
        getNextPageParam: ({ page, pagesCount }) => (page < pagesCount ? page + 1 : undefined),
        getPreviousPageParam: (_firstPage, _allPages, firstPageParam) => {
            return firstPageParam <= 1 ? undefined : firstPageParam - 1;
        },
    });
};

export const useUpcomingEvents = () => {
    return useQuery({
        queryKey: [QUERY_KEYS.UPCOMING_EVENTS],
        queryFn: async () => await getUpcomingEvents(),
    });
};
