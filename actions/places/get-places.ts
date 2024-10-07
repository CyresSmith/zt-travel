'use server';

import type { PaginationDto } from '@types';

import { DEFAULT_TAKE } from '@constants';

import prisma from '@prisma-util';

import { getPagination } from '@utils';

import { PlaceBasicInfoSelector } from '@data/places/selectors';
import type { PlaceBasicInfo } from '@data/places/types';

export type PlacesListRes = { data: PlaceBasicInfo[]; page: number; pagesCount: number };

type GetPlacesDto = {
    pagination: PaginationDto;
    categories?: string[];
    districtId?: string;
    communityId?: string;
};

const getPlacesList = async (dto?: GetPlacesDto): Promise<PlacesListRes> => {
    let where = {};

    if (dto?.categories && dto.categories.length > 0) {
        where = Object.assign(where, { categoryId: { in: dto?.categories } });
    }

    if (dto?.districtId) {
        where = Object.assign(where, { districtId: dto.districtId });
    }

    if (dto?.communityId) {
        where = Object.assign(where, { communityId: dto.communityId });
    }

    const places =
        (await prisma.place.findMany({
            ...getPagination(dto?.pagination),
            where,
            select: PlaceBasicInfoSelector,
            orderBy: { createdAt: 'asc' },
        })) || [];

    const count = await prisma.place.count();
    const page = dto?.pagination.page || 1;
    const take = dto?.pagination.take || DEFAULT_TAKE;
    const pagesCount = Math.max(count / take);

    return {
        data: places,
        page,
        pagesCount,
    };
};

export default getPlacesList;
