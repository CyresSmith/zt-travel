import { HydrationBoundary, dehydrate } from '@tanstack/react-query';

import { getTranslations } from 'next-intl/server';

import { PlaceCategory } from '@prisma/client';

import HomeSection from '@components/home/home-section';
import PlacesList from '@components/places/places-list';

import { QUERY_KEYS } from '@keys';

import { WithSearchParams } from '@types';

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
    const t = await getTranslations('pages.places.places-page-metadata');

    return {
        title: t('title'),
        description: t('description'),
    };
}

const PlacesPage = async ({ searchParams }: WithSearchParams) => {
    let queryKey: string[] = [QUERY_KEYS.PLACES];
    let selectedCategory: PlaceCategory | undefined = undefined;

    if (searchParams.category) {
        const placeCategories = await getPlaceCategories();
        selectedCategory = placeCategories?.find(({ slug }) => slug === searchParams.category);

        if (selectedCategory) {
            queryKey = [...queryKey, selectedCategory.id];
        }
    }

    const getDto = (pageParam: number) => {
        const dto = {
            pagination: { page: pageParam },
        };

        return selectedCategory ? Object.assign(dto, { categories: [selectedCategory.id] }) : dto;
    };

    const queryClient = getQueryClient();

    await queryClient.prefetchInfiniteQuery({
        queryKey,
        queryFn: async ({ pageParam }) => await getPlacesList(getDto(pageParam)),
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
