'use client';

import { useTranslations } from 'next-intl';

import EventItem from './eventItem';

import HomeSection from '../home-section';
import SectionCarousel from '../section-carousel';

import { useUpcomingEvents } from '@data/events/queries';

const EventsSection = () => {
    const t = useTranslations('homePage');

    const { data: events } = useUpcomingEvents();

    return (
        <HomeSection title={t('events-title')}>
            <SectionCarousel
                items={events?.map((event, i) => <EventItem key={i} event={event} />)}
                href={`events`}
                linkLabel={t('events-link-label')}
            />
        </HomeSection>
    );
};

export default EventsSection;
