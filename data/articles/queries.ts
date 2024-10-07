import { useQuery } from '@tanstack/react-query';

import { QUERY_KEYS } from '@keys';

import type { PaginationDto } from '@types';

import { DEFAULT_STALE_TIME } from '@constants';

import getArticles from '@actions/articles/get-articles';

export const useArticles = (dto?: PaginationDto) =>
    useQuery({
        queryKey: [QUERY_KEYS.ARTICLES, dto],
        queryFn: async () => await getArticles(dto),
        staleTime: DEFAULT_STALE_TIME,
    });
