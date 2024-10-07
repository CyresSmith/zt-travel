import type { District } from '@prisma/client';

import prisma from '@prisma-util';

const getDistricts = async (): Promise<Pick<District, 'id' | 'name_en' | 'name_uk'>[]> => {
    return (
        (await prisma.district.findMany({ select: { id: true, name_en: true, name_uk: true } })) ||
        []
    );
};

export default getDistricts;
