'use server';

import type { PaginationData, PaginationDto } from '@types';

import { DEFAULT_TAKE } from '@constants';

import prisma from '@prisma-util';

import { getPagination } from '@utils';

import { articleBasicInfoSelector } from '@data/articles/selectors';
import type { ArticleBasicInfo } from '@data/articles/types';
import type { TagBasicInfo } from '@data/tags/types';

export type ArticlesListRes = { data: ArticleBasicInfo[] } & PaginationData;

type GetArticlesDto = {
    pagination: PaginationDto;
    tags?: string[];
};

const getArticles = async (dto?: GetArticlesDto): Promise<ArticlesListRes> => {
    let where = {};

    if (dto?.tags && dto.tags.length > 0) {
        where = Object.assign(where, { tags: { some: { tagId: { in: dto?.tags } } } });
    }

    const articlesData = await prisma.article.findMany({
        ...getPagination(dto?.pagination),
        select: articleBasicInfoSelector,
        where,
        orderBy: { createdAt: 'desc' },
    });

    const count = await prisma.article.count();

    const page = dto?.pagination.page || 1;
    const take = dto?.pagination.take || DEFAULT_TAKE;
    const pagesCount = Math.max(count / take);

    const articles = articlesData.map(event => ({
        ...event,
        tags: (event.tags as unknown as { tag: TagBasicInfo }[]).map(({ tag }) => tag),
    }));

    return {
        data: articles,
        page,
        pagesCount,
    };
};

export default getArticles;
