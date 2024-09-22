import type { Place } from '@prisma/client';

export type PlaceBasicInfo = Pick<
    Place,
    'id' | 'image' | 'rating' | 'slug' | 'gmapsUrl' | 'name' | 'address' | 'desc'
>;
