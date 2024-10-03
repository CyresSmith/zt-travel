'use server';

import { auth } from '@auth';
import { ResponseStatus } from '@lib/enums';
import prisma from '@lib/prisma';
import type { ActionResponse } from '@lib/types';
import { UserRole } from '@prisma/client';

import type { AddArticleDto } from '@data/articles/types';

const addArticle = async (dto: AddArticleDto): Promise<ActionResponse> => {
    try {
        const session = await auth();
        const user = session?.user;
        const role = user?.role;

        if (!user || !role || role !== UserRole.ADMIN) {
            return { status: ResponseStatus.ERROR, message: 'Forbidden' };
        }

        const { tags, ...data } = dto;

        const result = await prisma.article.create({
            data: {
                ...data,
                tags: {
                    create: tags.map(id => ({ createdAt: new Date(), tag: { connect: { id } } })),
                },
            },
        });

        if (result) {
            return { status: ResponseStatus.SUCCESS, message: 'Created', data: { id: result.id } };
        } else {
            return { status: ResponseStatus.ERROR, message: 'Failed' };
        }
    } catch (error) {
        console.error('🚀 ~ addArticle ~ error:', error);
        return { status: ResponseStatus.ERROR, message: 'Something went wrong!' };
    }
};

export default addArticle;
