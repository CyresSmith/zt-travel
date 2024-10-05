import type { StringWithLocales } from '@lib/types';
import type { Place, PlaceCategory } from '@prisma/client';

import type { CloudinaryUploadDto } from '@actions/cloudinary/upload-image';

export type PlaceBasicInfo = Pick<
    Place,
    'id' | 'image' | 'rating' | 'slug' | 'gmapsUrl' | 'name' | 'address' | 'desc'
> & { category: Pick<PlaceCategory, 'id' | 'name' | 'slug'> };

export type AddPlaceDto = Partial<
    Pick<Place, 'email' | 'facebook' | 'gmapsUrl' | 'instagram' | 'latLang' | 'url'>
> & {
    name: StringWithLocales;
    desc: StringWithLocales;
    address: StringWithLocales;
    categoryId: string;
    communityId: string;
    districtId: string;
    phone: string;
    userId: string;
    slug: string;
};

export type UpdatePlaceDto = Partial<Omit<AddPlaceDto, 'userId' | 'slug'> & { image: string }>;

export type ImageUploadDto = {
    id: string;
    data: CloudinaryUploadDto;
};

export type UpdatePlaceData = { id: string; data: UpdatePlaceDto };
