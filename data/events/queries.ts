import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

import { QUERY_KEYS } from '@keys';

import getEvents from '@actions/events/get-events';
import getUpcomingEvents from '@actions/events/get-upcoming-events';

type GetEventsListDto = {
    tags: string[];
    districtId?: string;
    communityId?: string;
};

export const useEventsList = (dto?: Partial<GetEventsListDto>) => {
    return useInfiniteQuery({
        queryKey: [QUERY_KEYS.EVENTS, dto],
        queryFn: async ({ pageParam }) =>
            await getEvents({ pagination: { page: pageParam }, ...dto }),
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
