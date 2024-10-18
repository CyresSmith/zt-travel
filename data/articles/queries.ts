import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

import { QUERY_KEYS } from '@keys';

import type { PaginationDto } from '@types';

import { DEFAULT_STALE_TIME } from '@constants';

import getArticles from '@actions/articles/get-articles';
import getNewestArticles from '@actions/articles/get-newest-articles';

export const useNewestArticles = () =>
    useQuery({
        queryKey: [QUERY_KEYS.NEWEST_ARTICLES],
        queryFn: async () => await getNewestArticles(),
        staleTime: DEFAULT_STALE_TIME,
    });

export const useArticlesList = (dto: { tags?: string[] }) => {
    let queryKey: string[] = [QUERY_KEYS.EVENTS];

    if (dto.tags && dto.tags.length > 0) {
        queryKey = [...queryKey, ...dto.tags];
    }

    const getDto = (pageParam: number) => {
        let params: {
            tags?: string[];
            pagination: PaginationDto;
        } = {
            pagination: { page: pageParam },
        };

        if (dto.tags && dto.tags.length > 0) {
            params = Object.assign(params, { tags: dto.tags });
        }

        return params;
    };

    return useInfiniteQuery({
        queryKey,
        queryFn: async ({ pageParam }) => await getArticles(getDto(pageParam)),
        initialPageParam: 1,
        getNextPageParam: ({ page, pagesCount }) => (page < pagesCount ? page + 1 : undefined),
        getPreviousPageParam: (_firstPage, _allPages, firstPageParam) => {
            return firstPageParam <= 1 ? undefined : firstPageParam - 1;
        },
    });
};
