import { cache } from 'react';

import { notFound } from 'next/navigation';

import { namu } from '@lib/fonts';
import prisma from '@lib/prisma';
import type { StringWithLocales, WithLocale } from '@lib/types';
import { getLocaleValue } from '@lib/utils';
import clsx from 'clsx';

import Container from '@components/container';
import HomeSection from '@components/home/home-section';
import PlaceImage from '@components/place-page/place-image';
import ContactItem from '@components/shared/contact-item';

import { getPlaceBySlug } from '@data/places';

type Props = { params: { slug: string } & WithLocale };

const getPagePlace = cache(async (slug: string) => getPlaceBySlug(slug));

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
    const placeDesc = getLocaleValue(place.desc, locale);
    const placeAddress = getLocaleValue(place.address, locale);
    const placePhone = getLocaleValue(place.phone, locale);

    return (
        <>
            <Container>
                {place.image && <PlaceImage src={place.image} alt={placeTitle} />}

                <h1 className={clsx(namu.className, 'mb-5 mt-10 text-4xl text-themeBg')}>
                    {placeTitle}
                </h1>
            </Container>

            <HomeSection>
                <div className="relative z-10 grid grid-cols-2 gap-10 rounded-3xl bg-themeSecondary p-6 shadow-main">
                    <ul className="flex flex-col gap-3">
                        <li>
                            <ContactItem icon="streets-map-point">{placeAddress}</ContactItem>
                        </li>

                        {placePhone && (
                            <li>
                                <ContactItem
                                    link
                                    icon="phone-calling"
                                    href={`tel:${placePhone.split(' ').join('')}`}
                                >
                                    {placePhone}
                                </ContactItem>
                            </li>
                        )}
                    </ul>

                    <ul className="flex flex-col gap-3">
                        {place.url && (
                            <li>
                                <ContactItem link icon="feed" href={place.url}>
                                    Сайт
                                </ContactItem>
                            </li>
                        )}
                        {place.gmapsUrl && (
                            <li>
                                <ContactItem link icon="point-on-map" href={place.gmapsUrl}>
                                    Google
                                </ContactItem>
                            </li>
                        )}
                        {place.facebook && (
                            <li>
                                <ContactItem link icon="facebook" href={place.facebook}>
                                    Facebook
                                </ContactItem>
                            </li>
                        )}
                        {place.instagram && (
                            <li>
                                <ContactItem link icon="instagram" href={place.instagram}>
                                    Instagramm
                                </ContactItem>
                            </li>
                        )}
                    </ul>
                </div>
            </HomeSection>

            <HomeSection title={'Про місце'} light>
                <p className="relative z-10 text-justify">{placeDesc}</p>
            </HomeSection>
        </>
    );
};

export default PlacesPage;
