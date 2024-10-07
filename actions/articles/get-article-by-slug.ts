'use server';

import type { Article } from '@prisma/client';

import prisma from '@prisma-util';

const getArticleBySlug = async (slug: string): Promise<Article | null> => {
    try {
        return await prisma.article.findUnique({
            where: { slug },
        });
    } catch (error) {
        console.error('🚀 ~ getArticleBySlug ~ error:', error);
        return null;
    }
};

export default getArticleBySlug;
