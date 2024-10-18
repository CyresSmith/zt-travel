import { getTranslations } from 'next-intl/server';

import HomeSection from '@components/home/home-section';

import { routing } from '@i18n/routing';

export function generateStaticParams() {
    return routing.locales.map(locale => ({ locale }));
}

export async function generateMetadata() {
    const t = await getTranslations('pages.events.events-page-metadata');

    return {
        title: t('title'),
        description: t('description'),
    };
}

const EventsPage = async () => {
    return <HomeSection>DistrictsPage</HomeSection>;
};

export default EventsPage;
