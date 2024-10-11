import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

import { QUERY_KEYS } from '@keys';

import { DEFAULT_STALE_TIME } from '@constants';

import getArticles from '@actions/articles/get-articles';
import getNewestArticles from '@actions/articles/get-newest-articles';

type GetArticlesListDto = {
    tags: string[];
};

export const useNewestArticles = () =>
    useQuery({
        queryKey: [QUERY_KEYS.NEWEST_ARTICLES],
        queryFn: async () => await getNewestArticles(),
        staleTime: DEFAULT_STALE_TIME,
    });

export const useArticlesList = (dto?: Partial<GetArticlesListDto>) => {
    return useInfiniteQuery({
        queryKey: [QUERY_KEYS.ARTICLES, dto],
        queryFn: async ({ pageParam }) =>
            await getArticles({ pagination: { page: pageParam }, ...dto }),
        initialPageParam: 1,
        getNextPageParam: ({ page, pagesCount }) => (page < pagesCount ? page + 1 : undefined),
        getPreviousPageParam: (_firstPage, _allPages, firstPageParam) => {
            return firstPageParam <= 1 ? undefined : firstPageParam - 1;
        },
    });
};
