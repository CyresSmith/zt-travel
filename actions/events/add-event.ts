'use server';

import { auth } from '@auth';
import { ResponseStatus } from '@lib/enums';
import prisma from '@lib/prisma';
import type { ActionResponse } from '@lib/types';
import { UserRole } from '@prisma/client';

import type { AddEventDto } from '@data/events/types';

const addEvent = async (dto: AddEventDto): Promise<ActionResponse> => {
    try {
        const session = await auth();
        const user = session?.user;
        const role = user?.role;

        if (!user || !role || role !== UserRole.ADMIN) {
            return { status: ResponseStatus.ERROR, message: 'Forbidden' };
        }

        const { tags, ...data } = dto;

        const result = await prisma.event.create({
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
        console.error('🚀 ~ addEvent ~ error:', error);
        return { status: ResponseStatus.ERROR, message: 'Something went wrong!' };
    }
};

export default addEvent;
