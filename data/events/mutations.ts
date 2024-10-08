import { useMutation } from '@tanstack/react-query';

import type { EventBasicInfo } from './types';

import { QUERY_KEYS } from '@keys';

import getQueryClient from '@utils/get-query-client';

import addEvent from '@actions/events/add-event';
import updateEvent from '@actions/events/update-event';

export const useEventAdd = () => {
    const queryClient = getQueryClient();

    return useMutation({
        mutationFn: addEvent,
        onSuccess: data => {
            queryClient.setQueryData([QUERY_KEYS.EVENTS], (prev: EventBasicInfo[]) =>
                prev ? [data, ...prev] : [data]
            );
            queryClient.setQueryData([QUERY_KEYS.UPCOMING_EVENTS], (prev: EventBasicInfo[]) =>
                prev ? [data, ...prev] : [data]
            );
        },
    });
};

export const useEventUpdate = () => {
    const queryClient = getQueryClient();

    return useMutation({
        mutationFn: updateEvent,
        onSuccess: data => {
            queryClient.setQueryData([QUERY_KEYS.EVENTS], (prev: EventBasicInfo[]) => {
                if (prev) {
                    const array = [...prev];
                    const idx = array.findIndex(({ id }) => id === data.id);
                    array[idx] = data;
                    return array;
                }

                return [data];
            });
        },
    });
};
