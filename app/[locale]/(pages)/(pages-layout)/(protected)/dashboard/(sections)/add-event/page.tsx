import { HydrationBoundary, dehydrate } from '@tanstack/react-query';

import AddEventForm from '@components/dashboard/add-event';

import { QUERY_KEYS } from '@keys';

import { DEFAULT_STALE_TIME } from '@constants';

import getQueryClient from '@utils/get-query-client';

import getCommunities from '@actions/communities/get-communities';
import getDistricts from '@actions/districts/get-districts';
import getTagsByType from '@actions/tags/get-tag-by-type';

const AddEventPage = async () => {
    const queryClient = getQueryClient();

    await queryClient.prefetchQuery({
        queryKey: [QUERY_KEYS.DISTRICTS],
        queryFn: getDistricts,
        staleTime: DEFAULT_STALE_TIME,
    });

    await queryClient.prefetchQuery({
        queryKey: [QUERY_KEYS.COMMUNITIES],
        queryFn: getCommunities,
        staleTime: DEFAULT_STALE_TIME,
    });

    await queryClient.prefetchQuery({
        queryKey: [QUERY_KEYS.EVENT_TAGS],
        queryFn: async () => await getTagsByType('EVENT'),
    });

    const dehydratedState = dehydrate(queryClient);

    return (
        <HydrationBoundary state={dehydratedState}>
            <div className="flex w-full flex-col gap-10">
                <AddEventForm />
            </div>
        </HydrationBoundary>
    );
};

export default AddEventPage;
