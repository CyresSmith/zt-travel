import type { Article } from '@prisma/client';

import prisma from '@prisma-util';

const getArticlesByTagId = async (tagId: string): Promise<Article[] | null> => {
    try {
        return await prisma.article.findMany({
            where: { tags: { some: { tagId } } },
        });
    } catch (error) {
        console.error('🚀 ~ getArticlesByTagId ~ error:', error);
        return null;
    }
};

export default getArticlesByTagId;
