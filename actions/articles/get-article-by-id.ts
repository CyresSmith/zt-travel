'use server';

import type { Article } from '@prisma/client';

import prisma from '@prisma-util';

const getArticleById = async (id: string): Promise<Article | null> => {
    try {
        return await prisma.article.findUnique({
            where: { id },
        });
    } catch (error) {
        console.error('🚀 ~ getArticleById ~ error:', error);
        return null;
    }
};

export default getArticleById;
