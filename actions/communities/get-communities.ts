'use server';

import prisma from '@prisma-util';

import { CommunityBasicInfoSelector } from '@data/community/selectors';
import type { CommunityBasicInfo } from '@data/community/types';

const getCommunities = async (): Promise<CommunityBasicInfo[]> => {
    return (await prisma.community.findMany({ select: CommunityBasicInfoSelector })) || [];
};

export default getCommunities;
