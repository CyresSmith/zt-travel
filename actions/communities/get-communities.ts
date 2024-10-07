'use server';

import type { Community } from '@prisma/client';

import prisma from '@prisma-util';

const getCommunities = async (): Promise<Community[]> => {
    return (await prisma.community.findMany()) || [];
};

export default getCommunities;
