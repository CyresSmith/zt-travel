import { HydrationBoundary, dehydrate } from '@tanstack/react-query';

import AddLocationForm from '@components/dashboard/add-location';

import { QUERY_KEYS } from '@keys';

import { DEFAULT_STALE_TIME } from '@constants';

import getQueryClient from '@utils/get-query-client';

import { getCommunities } from '@data/community/queries';
import { getDistricts } from '@data/district/queries';

import getPlaceCategories from '@actions/place-categories/get-place-categiries';

const AddLocationPage = async () => {
    const queryClient = getQueryClient();

    await queryClient.prefetchQuery({
        queryKey: [QUERY_KEYS.PLACE_CATEGORIES],
        queryFn: getPlaceCategories,
        staleTime: DEFAULT_STALE_TIME,
    });

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

    const dehydratedState = dehydrate(queryClient);

    return (
        <HydrationBoundary state={dehydratedState}>
            <div className="flex w-full flex-col gap-10">
                <AddLocationForm />
            </div>
        </HydrationBoundary>
    );
};

export default AddLocationPage;
