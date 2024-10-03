import prisma from '@lib/prisma';
import type { PaginationDto } from '@lib/types';
import { getPagination } from '@lib/utils';
import type { Article } from '@prisma/client';

import type { ArticleBasicInfo } from './types';

export const getArticles = async (dto: PaginationDto): Promise<ArticleBasicInfo[]> => {
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

export const getArticleById = async (id: string): Promise<Article | null> => {
    try {
        return await prisma.article.findUnique({
            where: { id },
        });
    } catch (error) {
        return null;
    }
};

export const getArticleBySlug = async (slug: string): Promise<Article | null> => {
    try {
        return await prisma.article.findUnique({
            where: { slug },
        });
    } catch (error) {
        return null;
    }
};

export const getArticlesByTagId = async (tagId: string): Promise<Article[] | null> => {
    try {
        return await prisma.article.findMany({
            where: { tags: { some: { tagId } } },
        });
    } catch (error) {
        return null;
    }
};
