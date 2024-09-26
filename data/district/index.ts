import prisma from '@lib/prisma';
import type { District } from '@prisma/client';

export const getDistricts = async (): Promise<District[] | null> => {
    try {
        return await prisma.district.findMany();
    } catch (error) {
        return null;
    }
};
