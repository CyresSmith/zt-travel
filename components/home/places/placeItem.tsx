import { getLocale } from 'next-intl/server';

import { getLocaleValue } from '@lib/utils';

import SectionCard from '../section-card/section-card';

import type { PlaceBasicInfo } from '@data/places/types';

type Props = { place: PlaceBasicInfo };

const PlaceItem = async ({ place }: Props) => {
    const locale = await getLocale();
    const name = getLocaleValue(place.name, locale);
    const address = getLocaleValue(place.address, locale);

    return (
        <SectionCard
            image={place.image || ''}
            title={name}
            titleHref={`places/${place.slug}`}
            links={[{ href: place.gmapsUrl || '', icon: 'map-point', label: address }]}
        />
    );
};

export default PlaceItem;
