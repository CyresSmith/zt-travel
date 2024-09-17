import type { WithLocale } from '@lib/types';

type RootPageProps = {
    params: WithLocale;
};

export default async function Home({ params: { locale } }: RootPageProps) {
    return (
        <main>
            {/* <PlacesSection locale={locale} />
            <EventsSection locale={locale} /> */}
        </main>
    );
}
