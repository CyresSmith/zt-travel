import { HydrationBoundary, dehydrate } from '@tanstack/react-query';

import { getTranslations } from 'next-intl/server';

import HomeSection from '@components/home/home-section';
import PlacesList from '@components/places/places-list';

import { QUERY_KEYS } from '@keys';

import getQueryClient from '@utils/get-query-client';

import getCommunities from '@actions/communities/get-communities';
import getDistricts from '@actions/districts/get-districts';
import getPlaceCategories from '@actions/place-categories/get-place-categories';
import getPlacesList from '@actions/places/get-places';

import { routing } from '@i18n/routing';

export function generateStaticParams() {
    return routing.locales.map(locale => ({ locale }));
}

export async function generateMetadata() {
    const t = await getTranslations('places.places-page-metadata');

    return {
        title: t('title'),
        description: t('description'),
    };
}

const PlacesPage = async () => {
    const queryClient = getQueryClient();

    await queryClient.prefetchInfiniteQuery({
        queryKey: [QUERY_KEYS.PLACES],
        queryFn: async ({ pageParam }) => await getPlacesList({ pagination: { page: pageParam } }),
        initialPageParam: 1,
        getNextPageParam: ({ page }) => page + 1,
        pages: 1,
    });

    await queryClient.prefetchQuery({
        queryKey: [QUERY_KEYS.PLACE_CATEGORIES],
        queryFn: getPlaceCategories,
    });

    await queryClient.prefetchQuery({
        queryKey: [QUERY_KEYS.DISTRICTS],
        queryFn: getDistricts,
    });

    await queryClient.prefetchQuery({
        queryKey: [QUERY_KEYS.COMMUNITIES],
        queryFn: getCommunities,
    });

    const dehydratedState = dehydrate(queryClient);

    return (
        <HydrationBoundary state={dehydratedState}>
            <HomeSection>
                <PlacesList />
            </HomeSection>
        </HydrationBoundary>
    );
};

export default PlacesPage;
