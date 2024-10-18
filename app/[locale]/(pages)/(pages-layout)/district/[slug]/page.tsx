import { HydrationBoundary, dehydrate } from '@tanstack/react-query';

import DistrictPage from '@components/district/district-page';

import { QUERY_KEYS } from '@keys';

import { DEFAULT_STALE_TIME } from '@constants';

import getQueryClient from '@utils/get-query-client';

import getDistricts from '@actions/districts/get-districts';

type Props = { params: { slug: string } };

const EventsPage = async ({ params: { slug } }: Props) => {
    const queryClient = getQueryClient();

    await queryClient.prefetchQuery({
        queryKey: [QUERY_KEYS.DISTRICTS],
        queryFn: getDistricts,
        staleTime: DEFAULT_STALE_TIME,
    });

    const dehydratedState = dehydrate(queryClient);

    return (
        <HydrationBoundary state={dehydratedState}>
            <DistrictPage slug={slug} />
        </HydrationBoundary>
    );
};

export default EventsPage;
