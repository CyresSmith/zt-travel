'use server';

import { auth } from '@auth';
import { ResponseStatus } from '@lib/enums';
import prisma from '@lib/prisma';
import type { ActionResponse } from '@lib/types';
import { filterUndefinedValues } from '@lib/utils';
import { UserRole } from '@prisma/client';

import type { UpdateArticleDto } from '@data/articles/types';

type UpdateArticleData = { id: string; data: UpdateArticleDto };

const updateArticle = async ({
    id,
    data: articleData,
}: UpdateArticleData): Promise<ActionResponse> => {
    try {
        const session = await auth();
        const user = session?.user;
        const role = user?.role;

        if (!user || !role || role !== UserRole.ADMIN) {
            return { status: ResponseStatus.ERROR, message: 'Forbidden' };
        }

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

        const result = await prisma.article.update({ where: { id }, data });

        if (result) {
            return { status: ResponseStatus.SUCCESS, message: 'Updated' };
        } else {
            return { status: ResponseStatus.ERROR, message: 'Failed' };
        }
    } catch (error) {
        console.error('🚀 ~ addArticle ~ error:', error);
        return { status: ResponseStatus.ERROR, message: 'Something went wrong!' };
    }
};

export default updateArticle;
