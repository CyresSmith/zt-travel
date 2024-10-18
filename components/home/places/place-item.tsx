import { useLocale } from 'next-intl';

import SectionCard from '../../section-card/section-card';

import { buildUrl, getLocaleValue, stringifyQueryParams } from '@utils';

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
            titleHref={buildUrl('places', place.slug)}
            links={[
                {
                    href: place.gmapsUrl || undefined,
                    icon: 'map-point',
                    label: address,
                },
            ]}
            locale={locale as LocaleType}
            tags={[
                {
                    ...place.category,
                    slug: `${buildUrl('places')}?${stringifyQueryParams({ category: place.category.slug })}`,
                },
            ]}
        />
    );
};

export default PlaceItem;
