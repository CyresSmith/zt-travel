import EventsSection from '@components/home/events';
import Hero from '@components/home/hero';
import NewsSection from '@components/home/news';
import PlacesSection from '@components/home/places';

export default async function Home() {
    return (
        <>
            <Hero />
            <PlacesSection />
            <EventsSection />
            <NewsSection />
        </>
    );
}
