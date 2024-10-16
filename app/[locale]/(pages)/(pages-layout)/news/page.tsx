import { HydrationBoundary, dehydrate } from '@tanstack/react-query';

import { getTranslations } from 'next-intl/server';

import { TagType } from '@prisma/client';

import HomeSection from '@components/home/home-section';
import NewsList from '@components/news/news-list';

import { QUERY_KEYS } from '@keys';

import getQueryClient from '@utils/get-query-client';

import getArticles from '@actions/articles/get-articles';
import getTagsByType from '@actions/tags/get-tag-by-type';

import { routing } from '@i18n/routing';

export function generateStaticParams() {
    return routing.locales.map(locale => ({ locale }));
}

export async function generateMetadata() {
    const t = await getTranslations('pages.news.news-page-metadata');

    return {
        title: t('title'),
        description: t('description'),
    };
}

const NewsPage = async () => {
    const queryClient = getQueryClient();

    await queryClient.prefetchInfiniteQuery({
        queryKey: [QUERY_KEYS.ARTICLES, { tags: [] }],
        queryFn: async ({ pageParam }) => await getArticles({ pagination: { page: pageParam } }),
        initialPageParam: 1,
        getNextPageParam: ({ page }) => page + 1,
        pages: 1,
    });

    await queryClient.prefetchQuery({
        queryKey: [QUERY_KEYS.ARTICLE_TAGS],
        queryFn: async () => await getTagsByType(TagType.ARTICLE),
    });

    const dehydratedState = dehydrate(queryClient);

    return (
        <HydrationBoundary state={dehydratedState}>
            <HomeSection>
                <NewsList />
            </HomeSection>
        </HydrationBoundary>
    );
};

export default NewsPage;
