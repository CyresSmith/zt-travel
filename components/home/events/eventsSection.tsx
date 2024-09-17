import clsx from 'clsx';

import EventItem from './eventItem';

import HomeSection from '../home-section';

import type { WithLocale } from '@types';

import initTranslations from '@i18n';

type Props = {};

const EventsSection = async ({ locale }: Props & WithLocale) => {
    const { t } = await initTranslations(locale, ['home']);

    return (
        <HomeSection title={t('events-title')} titleHref={`events`} isLight>
            <ul className={clsx('grid w-full gap-8', `grid-cols-3`)}>
                <EventItem />
                <EventItem />
                <EventItem />
            </ul>
        </HomeSection>
    );
};

export default EventsSection;
