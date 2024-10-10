'use server';

import prisma from '@prisma-util';

import { filterUndefinedValues } from '@utils';

import { articleBasicInfoSelector } from '@data/articles/selectors';
import type { ArticleBasicInfo, UpdateArticleDto } from '@data/articles/types';

type UpdateArticleData = { id: string; data: UpdateArticleDto };

const updateArticle = async ({
    id,
    data: articleData,
}: UpdateArticleData): Promise<ArticleBasicInfo> => {
    const { tags, ...rest } = articleData;

    let data = filterUndefinedValues(rest);

    if (tags && tags.length > 0) {
        await prisma.tagsOnArticles.deleteMany({ where: { articleId: id } });

        data = Object.assign(data, {
            tags: {
                create: articleData.tags?.map(id => ({
                    createdAt: new Date(),
                    tag: { connect: { id } },
                })),
            },
        });
    }

    const result = await prisma.article.update({
        where: { id },
        data,
        select: articleBasicInfoSelector,
    });

    return result as unknown as ArticleBasicInfo;
};

export default updateArticle;
