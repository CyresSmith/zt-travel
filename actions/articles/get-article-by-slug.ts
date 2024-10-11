'use server';

import type { Article } from '@prisma/client';

import prisma from '@prisma-util';

import { articleBasicInfoSelector } from '@data/articles/selectors';
import type { ArticleBasicInfo } from '@data/articles/types';
import type { TagBasicInfo } from '@data/tags/types';

const getArticleBySlug = async (
    slug: string
): Promise<(Article & { similar: ArticleBasicInfo[] }) | null> => {
    try {
        const article = await prisma.article.findUnique({
            where: { slug },
        });

        if (!article) return null;

        const tags = (
            (await prisma.tagsOnArticles.findMany({ where: { articleId: article?.id } })) || []
        )?.map(({ tagId }) => tagId);

        const similar = await prisma.article.findMany({
            where: { tags: { some: { tagId: { in: tags }, articleId: { not: article.id } } } },
            select: articleBasicInfoSelector,
            take: 6,
            orderBy: { createdAt: 'desc' },
        });

        return {
            ...article,
            similar:
                (similar.map(item => ({
                    ...item,
                    tags: (item.tags as unknown as { tag: TagBasicInfo }[]).map(({ tag }) => tag),
                })) as unknown as ArticleBasicInfo[]) || [],
        };
    } catch (error) {
        console.error('🚀 ~ getArticleBySlug ~ error:', error);
        return null;
    }
};

export default getArticleBySlug;
