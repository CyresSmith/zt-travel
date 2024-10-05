'use server';

import prisma from '@lib/prisma';
import { UserRole } from '@prisma/client';

import type { ActionResponse } from '@types';

import { ResponseStatus } from '@enums';

import { auth } from '@auth';

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
