import { useQuery } from '@tanstack/react-query';

import { QUERY_KEYS } from '@keys';

import { DEFAULT_STALE_TIME } from '@constants';

import getCommunities from '@actions/communities/get-communities';

export const useCommunities = () => {
    return useQuery({
        queryKey: [QUERY_KEYS.COMMUNITIES],
        queryFn: getCommunities,
        staleTime: DEFAULT_STALE_TIME,
    });
};
