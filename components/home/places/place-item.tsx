import { useLocale } from 'next-intl';

import SectionCard from '../../section-card/section-card';

import { getLocaleValue } from '@utils';

import type { PlaceBasicInfo } from '@data/places/types';

import type { LocaleType } from '@i18n/routing';

type Props = { place: PlaceBasicInfo };

const PlaceItem = ({ place }: Props) => {
    const locale = useLocale();
    const name = getLocaleValue(place.name, locale);
    const address = getLocaleValue(place.address, locale);

    return (
        <SectionCard
            image={place.image || ''}
            title={name}
            titleHref={`places/${place.slug}`}
            links={[{ href: place.gmapsUrl || '', icon: 'map-point', label: address }]}
            locale={locale as LocaleType}
            tags={[{ ...place.category, slug: `places?category=${place.category.slug}` }]}
        />
    );
};

export default PlaceItem;
