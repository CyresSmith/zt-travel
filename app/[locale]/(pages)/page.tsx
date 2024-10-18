import { HydrationBoundary, dehydrate } from '@tanstack/react-query';

import EventsSection from '@components/home/events';
import Hero from '@components/home/hero';
import NewsSection from '@components/home/news';
import PlacesSection from '@components/home/places';

import { QUERY_KEYS } from '@keys';

import getQueryClient from '@utils/get-query-client';

import getNewestArticles from '@actions/articles/get-newest-articles';
import getUpcomingEvents from '@actions/events/get-upcoming-events';
import getPopularPlaces from '@actions/places/get-popular-places';

export default async function Home() {
    const queryClient = getQueryClient();

    await queryClient.prefetchQuery({
        queryKey: [QUERY_KEYS.POPULAR_PLACES],
        queryFn: async () => await getPopularPlaces(),
    });

    await queryClient.prefetchQuery({
        queryKey: [QUERY_KEYS.UPCOMING_EVENTS],
        queryFn: async () => await getUpcomingEvents(),
    });

    await queryClient.prefetchQuery({
        queryKey: [QUERY_KEYS.NEWEST_ARTICLES],
        queryFn: async () => await getNewestArticles(),
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
