'use server';

import prisma from '@prisma-util';

import { articleBasicInfoSelector } from '@data/articles/selectors';
import type { AddArticleDto, ArticleBasicInfo } from '@data/articles/types';

const addArticle = async (dto: AddArticleDto): Promise<ArticleBasicInfo> => {
    const { tags, ...data } = dto;

    const article = await prisma.article.create({
        data: {
            ...data,
            tags: {
                create: tags.map(id => ({ createdAt: new Date(), tag: { connect: { id } } })),
            },
        },
        select: articleBasicInfoSelector,
    });

    return article as unknown as ArticleBasicInfo;
};

export default addArticle;
