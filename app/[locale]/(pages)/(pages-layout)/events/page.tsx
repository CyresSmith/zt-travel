import { HydrationBoundary, dehydrate } from '@tanstack/react-query';

import { getTranslations } from 'next-intl/server';

import EventsList from '@components/events/events-list';
import HomeSection from '@components/home/home-section';

import { QUERY_KEYS } from '@keys';

import getQueryClient from '@utils/get-query-client';

import getEvents from '@actions/events/get-events';
import getTagsByType from '@actions/tags/get-tag-by-type';

import { routing } from '@i18n/routing';

export function generateStaticParams() {
    return routing.locales.map(locale => ({ locale }));
}

export async function generateMetadata() {
    const t = await getTranslations('events.events-page-metadata');

    return {
        title: t('title'),
        description: t('description'),
    };
}

const EventsPage = async () => {
    const queryClient = getQueryClient();

    await queryClient.prefetchInfiniteQuery({
        queryKey: [QUERY_KEYS.EVENTS],
        queryFn: async ({ pageParam }) => await getEvents({ pagination: { page: pageParam } }),
        initialPageParam: 1,
        getNextPageParam: ({ page }) => page + 1,
        pages: 1,
    });

    await queryClient.prefetchQuery({
        queryKey: [QUERY_KEYS.EVENT_TAGS],
        queryFn: async () => await getTagsByType('EVENT'),
    });

    const dehydratedState = dehydrate(queryClient);

    return (
        <HydrationBoundary state={dehydratedState}>
            <HomeSection>
                <EventsList />
            </HomeSection>
        </HydrationBoundary>
    );
};

export default EventsPage;
