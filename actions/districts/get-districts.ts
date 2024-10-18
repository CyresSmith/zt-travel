'use server';

import prisma from '@prisma-util';

import { DistrictBasicInfoSelector } from '@data/district/selectors';
import type { DistrictBasicInfo } from '@data/district/types';

const getDistricts = async (): Promise<DistrictBasicInfo[]> => {
    return (await prisma.district.findMany({ select: DistrictBasicInfoSelector })) || [];
};

export default getDistricts;
