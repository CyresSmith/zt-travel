import prisma from '@lib/prisma';
import type { Community } from '@prisma/client';

export const getCommunities = async (): Promise<Community[] | null> => {
    try {
        return await prisma.community.findMany();
    } catch (error) {
        return null;
    }
};
