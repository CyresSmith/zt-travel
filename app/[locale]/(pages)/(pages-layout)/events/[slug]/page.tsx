import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';

import type { Event } from '@prisma/client';
import { format } from 'date-fns';
import { enIN, uk } from 'date-fns/locale';

import SingleItemPage from '@components/shared/single-item-page';

import type { StringWithLocales, WithLocale } from '@types';

import type { IconName } from '@icon-names';

import prisma from '@prisma-util';

import { getInfo, getLocaleValue } from '@utils';

import getEventBySlug from '@actions/events/get-event-by-slug';

type Props = { params: { slug: string } & WithLocale };

export async function generateStaticParams() {
    const allEvents = await prisma.event.findMany();
    return allEvents.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params: { slug, locale } }: Props) {
    const event = await getEventBySlug(slug);

    const title = (event?.name as StringWithLocales)[locale] || 'Some event';
    const description = (event?.desc as StringWithLocales)[locale] || 'Some description';

    return {
        title,
        description,
    };
}

const EventsPage = async ({ params: { slug, locale } }: Props) => {
    const t = await getTranslations('pages.events');
    const event = await getEventBySlug(slug);

    if (!event) notFound();

    return (
        <SingleItemPage
            title={getLocaleValue(event.name, locale)}
            image={event?.image || undefined}
            desc={getLocaleValue(event.desc, locale)}
            descTitle={t('about')}
            info={getInfo<Event>(event, locale)}
            similarTitle={t('similar')}
            similarPrefix="events"
            similarItems={event.similar?.map(
                ({ image, name, slug, tags, desc, address, start }) => ({
                    image,
                    title: getLocaleValue(name, locale),
                    titleHref: slug,
                    tags,
                    locale,
                    desc: getLocaleValue(desc, locale),
                    links: [
                        {
                            icon: 'streets-map-point' as IconName,
                            label: getLocaleValue(address, locale),
                        },
                        {
                            icon: 'calendar-add' as IconName,
                            label: format(start, 'HH:mm, PPPP', {
                                locale: locale === 'uk' ? uk : enIN,
                            }),
                        },
                    ],
                })
            )}
        />
    );
};

export default EventsPage;
