'use server';

import type { PaginationDto } from '@types';

import prisma from '@prisma-util';

import { getPagination } from '@utils';

import type { ArticleBasicInfo } from '@data/articles/types';

const getArticles = async (dto?: PaginationDto): Promise<ArticleBasicInfo[]> => {
    const articlesData = await prisma.article.findMany({
        ...getPagination(dto),
        select: {
            id: true,
            slug: true,
            image: true,
            desc: true,
            text: true,
            name: true,
            createdAt: true,
            tags: {
                select: {
                    tag: {
                        select: {
                            id: true,
                            name: true,
                            slug: true,
                        },
                    },
                },
            },
        },
    });

    const articles = articlesData.map(article => ({
        ...article,
        tags: article.tags.map(tagRelation => tagRelation.tag),
    }));

    return articles;
};

export default getArticles;
