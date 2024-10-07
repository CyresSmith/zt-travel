import type { Article } from '@prisma/client';

import type { StringWithLocales } from '@types';

import type { TagBasicInfo } from '@data/tags/types';

export type ArticleBasicInfo = Pick<
    Article,
    'id' | 'image' | 'slug' | 'name' | 'desc' | 'text' | 'createdAt'
> & { tags: TagBasicInfo[] };

export type AddArticleDto = {
    name: StringWithLocales;
    desc: StringWithLocales;
    text: StringWithLocales;
    userId: string;
    slug: string;
    tags: string[];
    // placeId?: string;
};

export type UpdateArticleDto = Partial<Omit<AddArticleDto, 'userId' | 'slug'> & { image: string }>;
