import { HydrationBoundary, dehydrate } from '@tanstack/react-query';

import EventsSection from '@components/home/events';
import Hero from '@components/home/hero';
import NewsSection from '@components/home/news';
import PlacesSection from '@components/home/places';

import { QUERY_KEYS } from '@keys';

import { DEFAULT_STALE_TIME } from '@constants';

import getQueryClient from '@utils/get-query-client';

import getArticles from '@actions/articles/get-articles';
import getEvents from '@actions/events/get-events';
import getPopularPlaces from '@actions/places/get-popular-places';

export default async function Home() {
    const queryClient = getQueryClient();

    await queryClient.prefetchQuery({
        queryKey: [QUERY_KEYS.POPULAR_PLACES],
        queryFn: async () => await getPopularPlaces(),
        staleTime: DEFAULT_STALE_TIME,
    });

    await queryClient.prefetchQuery({
        queryKey: [QUERY_KEYS.EVENTS],
        queryFn: async () => await getEvents(),
        staleTime: DEFAULT_STALE_TIME,
    });

    await queryClient.prefetchQuery({
        queryKey: [QUERY_KEYS.ARTICLES],
        queryFn: async () => await getArticles(),
        staleTime: DEFAULT_STALE_TIME,
    });

    const dehydratedState = dehydrate(queryClient);

    return (
        <HydrationBoundary state={dehydratedState}>
            <Hero />
            <PlacesSection />
            <EventsSection />
            <NewsSection />
        </HydrationBoundary>
    );
}
