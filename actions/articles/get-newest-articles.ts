'use server';

import type { PaginationData } from '@types';

import { DEFAULT_TAKE } from '@constants';

import prisma from '@prisma-util';

import { articleBasicInfoSelector } from '@data/articles/selectors';
import type { ArticleBasicInfo } from '@data/articles/types';
import type { TagBasicInfo } from '@data/tags/types';

export type ArticlesListRes = { data: ArticleBasicInfo[] } & PaginationData;

const getNewestArticles = async (): Promise<ArticleBasicInfo[]> => {
    const articlesData = await prisma.article.findMany({
        select: articleBasicInfoSelector,
        orderBy: { createdAt: 'desc' },
        take: DEFAULT_TAKE,
    });

    const articles = articlesData.map(event => ({
        ...event,
        tags: (event.tags as unknown as { tag: TagBasicInfo }[]).map(({ tag }) => tag),
    }));

    return articles;
};

export default getNewestArticles;
