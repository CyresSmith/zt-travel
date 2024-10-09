import type { Event } from '@prisma/client';

import type { StringWithLocales } from '@types';

import type { TagBasicInfo } from '@data/tags/types';

export type EventBasicInfo = Pick<
    Event,
    'id' | 'image' | 'rating' | 'slug' | 'name' | 'address' | 'desc' | 'start' | 'duration'
> & { tags: TagBasicInfo[] };

export type AddEventDto = Partial<Pick<Event, 'url'>> & {
    name: StringWithLocales;
    desc: StringWithLocales;
    address: StringWithLocales;
    phone: string;
    userId: string;
    placeId?: string;
    slug: string;
    duration: number;
    periodic: boolean;
    tags: TagBasicInfo[];
    start: Date;
};

export type UpdateEventDto = Partial<Omit<AddEventDto, 'userId' | 'slug'> & { image: string }>;
