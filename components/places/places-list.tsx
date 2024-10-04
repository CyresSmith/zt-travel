'use client';

import { useEffect, useState, useTransition } from 'react';
import { useInView } from 'react-intersection-observer';

import { useLocale } from 'next-intl';

import { getLocaleValue } from '@lib/utils';

import { Button } from '@ui/button';

import SectionCard from '@components/section-card/section-card';

import type { LocaleType } from '@i18n/routing';

import { getPlaces } from '@data/places';
import type { PlaceBasicInfo } from '@data/places/types';

type Props = { places: PlaceBasicInfo[] };

const PlacesList = ({ places }: Props) => {
    const [page, setPage] = useState(2);
    const { ref, inView } = useInView();
    const locale = useLocale();
    const [isPending, startTransition] = useTransition();

    const [placesData, setPlacesData] = useState<PlaceBasicInfo[]>([]);

    const setData = async () => {
        const data = await getPlaces({ page });

        console.log('🚀 ~ setData ~ data:', data);

        setPlacesData(p => [...p, ...data]);
        setPage(p => p + 1);
    };

    useEffect(() => {
        if (!places) return;
        setPlacesData(places);
    }, [places]);

    return (
        <>
            <ul className="grid grid-cols-3 gap-5">
                {placesData.map(({ name, image, slug, id, address, gmapsUrl, desc, category }) => (
                    <SectionCard
                        key={id}
                        image={image || ''}
                        title={getLocaleValue(name, locale)}
                        titleHref={`places/${slug}`}
                        locale={locale as LocaleType}
                        links={[
                            {
                                label: getLocaleValue(address, locale),
                                icon: 'point-on-map',
                                href: gmapsUrl || undefined,
                            },
                        ]}
                        desc={getLocaleValue(desc, locale)}
                        tags={[category]}
                    />
                ))}
            </ul>

            <Button onClick={setData}>Load more</Button>

            {/* <div ref={ref} className={clsx('mt-10', { ['invisible']: !isPending })}>
                <Icon
                    name="black-hole"
                    className="animate-spin fill-themeBg"
                    width={50}
                    height={50}
                />
            </div> */}
        </>
    );
};

export default PlacesList;
