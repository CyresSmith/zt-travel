import { getTranslations } from 'next-intl/server';

import EventItem from './eventItem';

import HomeSection from '../home-section';
import SectionCarousel from '../section-carousel';

const EventsSection = async () => {
    const t = await getTranslations('homePage');

    return (
        <HomeSection title={t('events-title')} titleHref={`events`} isLight>
            <SectionCarousel
                items={Array.from({ length: 5 }).map((event, i) => (
                    <EventItem key={i} />
                ))}
            />
        </HomeSection>
    );
};

export default EventsSection;
