import clsx from 'clsx';

import PlaceItem from './placeItem';

import HomeSection from '../home-section';

import type { WithLocale } from '@types';

import initTranslations from '@i18n';

type Props = {};

const PlacesSection = async ({ locale }: Props & WithLocale) => {
    const { t } = await initTranslations(locale, ['home']);

    return (
        <HomeSection title={t('places-title')} titleHref="places" isFirst>
            <ul className={clsx('grid w-full gap-8', `grid-cols-3`)}>
                <PlaceItem />
                <PlaceItem />
                <PlaceItem />
            </ul>
        </HomeSection>
    );
};

export default PlacesSection;
