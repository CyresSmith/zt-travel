import { getTranslations } from 'next-intl/server';

import EventItem from './eventItem';

import HomeSection from '../home-section';
import SectionCarousel from '../section-carousel';

import { getEvents } from '@data/events';

const EventsSection = async () => {
    const t = await getTranslations('homePage');
    const events = await getEvents({ take: 6 });

    return (
        <HomeSection
            title={t('events-title')}
            href={`events`}
            linkLabel={t('events-link-label')}
            light
        >
            <SectionCarousel
                items={events.map((event, i) => (
                    <EventItem key={i} event={event} />
                ))}
            />
        </HomeSection>
    );
};

export default EventsSection;
