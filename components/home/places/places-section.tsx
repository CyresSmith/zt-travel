'use client';

import { useTranslations } from 'next-intl';

import PlaceItem from './place-item';

import HomeSection from '../home-section';
import SectionCarousel from '../section-carousel';

import { usePopularPlaces } from '@data/places/queries';

const PlacesSection = () => {
    const t = useTranslations('homePage');

    const { data: places } = usePopularPlaces();

    return (
        <HomeSection title={t('places-title')}>
            <SectionCarousel
                items={places?.map(place => <PlaceItem key={place.id} place={place} />)}
                href={`places`}
                linkLabel={t('places-link-label')}
            />
        </HomeSection>
    );
};

export default PlacesSection;
