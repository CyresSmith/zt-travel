import { useMutation } from '@tanstack/react-query';

import type { ArticleBasicInfo } from './types';

import { QUERY_KEYS } from '@keys';

import getQueryClient from '@utils/get-query-client';

import addArticle from '@actions/articles/add-article';
import updateArticle from '@actions/articles/update-article';

export const useArticleAdd = () => {
    const queryClient = getQueryClient();

    return useMutation({
        mutationFn: addArticle,
        onSuccess: data => {
            queryClient.setQueryData([QUERY_KEYS.ARTICLES], (prev: ArticleBasicInfo[]) =>
                prev ? [data, ...prev] : [data]
            );
            queryClient.setQueryData([QUERY_KEYS.NEWEST_ARTICLES], (prev: ArticleBasicInfo[]) =>
                prev ? [data, ...prev] : [data]
            );
        },
    });
};

export const useArticleUpdate = () => {
    const queryClient = getQueryClient();

    return useMutation({
        mutationFn: updateArticle,
        onSuccess: data => {
            queryClient.setQueryData([QUERY_KEYS.ARTICLES, { id: data.id }], data);
            queryClient.setQueryData([QUERY_KEYS.ARTICLES, { slug: data.slug }], data);
            queryClient.setQueryData([QUERY_KEYS.ARTICLES], (prev: ArticleBasicInfo[]) => {
                if (prev) {
                    const array = [...prev];

                    const idx = array.findIndex(article => article.id === data.id);

                    if (idx) {
                        array[idx] = data;
                    }

                    return array;
                }

                return [data];
            });
            queryClient.setQueryData([QUERY_KEYS.NEWEST_ARTICLES], (prev: ArticleBasicInfo[]) => {
                if (prev) {
                    const array = [...prev];

                    const idx = array.findIndex(article => article.id === data.id);

                    if (idx) {
                        array[idx] = data;
                    }

                    return array;
                }

                return [data];
            });
        },
    });
};
