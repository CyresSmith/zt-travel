import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';

import { Place } from '@prisma/client';

import SingleItemPage from '@components/shared/single-item-page';

import type { StringWithLocales, WithLocale } from '@types';

import prisma from '@prisma-util';

import { getInfo, getLocaleValue } from '@utils';

import getPlaceBySlug from '@actions/places/get-place-by-slug';

type Props = { params: { slug: string } & WithLocale };

export async function generateStaticParams() {
    const allPlaces = await prisma.place.findMany();
    return allPlaces.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params: { slug, locale } }: Props) {
    const t = await getTranslations('pages.places');
    const place = await getPlaceBySlug(slug);

    const title = (place?.name as StringWithLocales)[locale] || 'Some place';
    const description = (place?.desc as StringWithLocales)[locale] || 'Some description';

    return {
        title,
        description,
    };
}

const PlacesPage = async ({ params: { slug, locale } }: Props) => {
    const t = await getTranslations('pages.places');
    const place = await getPlaceBySlug(slug);

    if (!place) notFound();

    return (
        <SingleItemPage
            title={getLocaleValue(place.name, locale)}
            image={place?.image || undefined}
            desc={getLocaleValue(place.desc, locale)}
            descTitle={t('about')}
            info={getInfo<Place>(place, locale)}
            similarTitle={t('similar')}
            similarPrefix="places"
            similarItems={place.similar?.map(
                ({ address, category, desc, image, name, slug, gmapsUrl }) => ({
                    image,
                    title: getLocaleValue(name, locale),
                    titleHref: `${slug}`,
                    desc: getLocaleValue(desc, locale),
                    locale,
                    links: [
                        {
                            icon: 'streets-map-point',
                            label: getLocaleValue(address, locale),
                            href: gmapsUrl || undefined,
                        },
                    ],
                    tags: [
                        {
                            id: category.id,
                            name: category.name,
                            slug: category.slug,
                        },
                    ],
                })
            )}
        />
    );
};

export default PlacesPage;
