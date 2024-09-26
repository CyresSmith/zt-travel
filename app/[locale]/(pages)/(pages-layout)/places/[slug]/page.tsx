import { cache } from 'react';

import { notFound } from 'next/navigation';

import prisma from '@lib/prisma';
import type { StringWithLocales, WithLocale } from '@lib/types';
import { getLocaleValue } from '@lib/utils';

import { getPlaceBySlug } from '@data/places';

type Props = { params: { slug: string } & WithLocale };

const getPagePlace = cache(async (slug: string) => {
    return getPlaceBySlug(slug);
});

export async function generateStaticParams() {
    const allPlaces = await prisma.place.findMany();

    return allPlaces.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params: { slug, locale } }: Props) {
    const place = await getPagePlace(slug);

    const title = (place?.name as StringWithLocales)[locale] || 'Some place';
    const description = (place?.desc as StringWithLocales)[locale] || 'Some description';

    return {
        title,
        description,
    };
}

const PlacesPage = async ({ params: { slug, locale } }: Props) => {
    const place = await getPagePlace(slug);

    if (!place) notFound();

    const placeTitle = getLocaleValue(place.name, locale);

    return (
        <div>
            <h1>{placeTitle}</h1>
        </div>
    );
};

export default PlacesPage;
