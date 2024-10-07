import { useQuery } from '@tanstack/react-query';

import { QUERY_KEYS } from '@keys';

import type { PaginationDto } from '@types';

import { DEFAULT_STALE_TIME } from '@constants';

import getEvents from '@actions/events/get-events';

export const useEvents = (dto?: PaginationDto) => {
    return useQuery({
        queryKey: [QUERY_KEYS.EVENTS, dto],
        queryFn: async () => await getEvents(dto),
        staleTime: DEFAULT_STALE_TIME,
    });
};
