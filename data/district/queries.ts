import { useQuery } from '@tanstack/react-query';

import { QUERY_KEYS } from '@keys';

import { DEFAULT_STALE_TIME } from '@constants';

import getDistricts from '@actions/districts/get-districts';

export const useDistricts = () => {
    return useQuery({
        queryKey: [QUERY_KEYS.DISTRICTS],
        queryFn: getDistricts,
        staleTime: DEFAULT_STALE_TIME,
    });
};
