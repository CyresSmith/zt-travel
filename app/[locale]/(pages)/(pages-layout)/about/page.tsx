import { HydrationBoundary, dehydrate } from '@tanstack/react-query';

import { getTranslations } from 'next-intl/server';

import clsx from 'clsx';

import AboutPageAccordion from '@components/about/about-page-accordion';
import RegionsSection from '@components/about/regions-section/regions-section';
import Container from '@components/container';

import { namu } from '@fonts';

import { QUERY_KEYS } from '@keys';

import { DEFAULT_STALE_TIME } from '@constants';

import getQueryClient from '@utils/get-query-client';

import getDistricts from '@actions/districts/get-districts';

export async function generateMetadata() {
    const t = await getTranslations('pages.about.metadata');

    return {
        title: t('title'),
        description: t('description'),
    };
}

const AboutPage = async () => {
    const t = await getTranslations('pages.about');

    const queryClient = getQueryClient();

    await queryClient.prefetchQuery({
        queryKey: [QUERY_KEYS.DISTRICTS],
        queryFn: getDistricts,
        staleTime: DEFAULT_STALE_TIME,
    });

    const dehydratedState = dehydrate(queryClient);

    return (
        <HydrationBoundary state={dehydratedState}>
            <Container className="py-5">
                <h1 className={clsx(namu.className, 'text-5xl text-themeYellow')}>{t('title')}</h1>
            </Container>
            <AboutPageAccordion />
            <RegionsSection title={t('districts')} />
        </HydrationBoundary>
    );
};

export default AboutPage;
