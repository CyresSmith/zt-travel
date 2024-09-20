import EventsSection from '@components/home/events';
import Hero from '@components/home/hero';
import PlacesSection from '@components/home/places';

export default async function Home() {
    return (
        <div className="flex flex-col gap-10">
            <Hero />
            <PlacesSection />
            <EventsSection />
        </div>
    );
}
