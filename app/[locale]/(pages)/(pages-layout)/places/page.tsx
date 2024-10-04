import { getTranslations } from 'next-intl/server';

import HomeSection from '@components/home/home-section';
import PlacesList from '@components/places/places-list';

import { routing } from '@i18n/routing';

import { getPlaces } from '@data/places';

export function generateStaticParams() {
    return routing.locales.map(locale => ({ locale }));
}

export async function generateMetadata() {
    const t = await getTranslations('places.places-page-metadata');

    return {
        title: t('title'),
        description: t('description'),
    };
}

const PlacesPage = async () => {
    const places = await getPlaces();

    return (
        <HomeSection>
            <PlacesList places={places} />
        </HomeSection>
    );
};

export default PlacesPage;
