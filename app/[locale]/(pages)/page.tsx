import { HydrationBoundary, dehydrate } from '@tanstack/react-query';

import { DEFAULT_STALE_TIME } from '@lib/constants';
import { QUERY_KEYS } from '@lib/keys';
import getQueryClient from '@lib/utils/get-query-client';

import EventsSection from '@components/home/events';
import Hero from '@components/home/hero';
import NewsSection from '@components/home/news';
import PlacesSection from '@components/home/places';

import { getArticles } from '@data/articles';
import { getEvents } from '@data/events/queries';
import { getPlaces } from '@data/places/queries';

export default async function Home() {
    const queryClient = getQueryClient();

    const dto = { take: 6 };

    await queryClient.prefetchQuery({
        queryKey: [QUERY_KEYS.PLACES, dto],
        queryFn: async () => await getPlaces(dto),
        staleTime: DEFAULT_STALE_TIME,
    });

    await queryClient.prefetchQuery({
        queryKey: [QUERY_KEYS.EVENTS, dto],
        queryFn: async () => await getEvents(dto),
        staleTime: DEFAULT_STALE_TIME,
    });

    await queryClient.prefetchQuery({
        queryKey: [QUERY_KEYS.ARTICLES, dto],
        queryFn: async () => await getArticles(dto),
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
