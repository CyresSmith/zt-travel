'use server';

import prisma from '@prisma-util';

import { DistrictBasicInfoSelector } from '@data/district/selectors';
import type { DistrictBasicInfo } from '@data/district/types';

const getDistrictBySlug = async (slug: string): Promise<DistrictBasicInfo | null> => {
    return await prisma.district.findFirst({
        where: { slug },
        select: DistrictBasicInfoSelector,
    });
};

export default getDistrictBySlug;
