import { useQuery } from '@tanstack/react-query';

import { QUERY_KEYS } from '@keys';

import type { PaginationDto } from '@types';

import getEvents from '@actions/events/get-events';
import getUpcomingEvents from '@actions/events/get-upcoming-events';

export const useEvents = (dto?: PaginationDto) => {
    return useQuery({
        queryKey: [QUERY_KEYS.EVENTS, dto],
        queryFn: async () => await getEvents(dto),
    });
};

export const useUpcomingEvents = () => {
    return useQuery({
        queryKey: [QUERY_KEYS.UPCOMING_EVENTS],
        queryFn: async () => await getUpcomingEvents(),
    });
};
