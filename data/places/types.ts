import type { Place, PlaceText } from '@prisma/client';

export type PlaceTextInfo = Pick<PlaceText, 'address' | 'desc' | 'name'>;

export type PlaceBasicInfo = Pick<Place, 'id' | 'image' | 'rating' | 'slug' | 'gmapsUrl'> & {
    placeText: PlaceTextInfo[];
};

export type PlaceWithText = Place & {
    placeText: PlaceTextInfo[];
};
