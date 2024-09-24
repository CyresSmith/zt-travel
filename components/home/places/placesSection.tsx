import { getTranslations } from 'next-intl/server';

import PlaceItem from './placeItem';

import HomeSection from '../home-section';
import SectionCarousel from '../section-carousel';

import { getPlaces } from '@data/places/places';

const PlacesSection = async () => {
    const t = await getTranslations('homePage');
    const palaces = await getPlaces({ take: 4 });

    return (
        <HomeSection title={t('places-title')} href={`events`} linkLabel={t('places-link-label')}>
            <SectionCarousel
                items={palaces?.map(place => <PlaceItem key={place.id} place={place} />)}
            />
        </HomeSection>
    );
};

export default PlacesSection;
