import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';

import clsx from 'clsx';
import { format, millisecondsToHours } from 'date-fns';
import { enIN, uk } from 'date-fns/locale';
import { setDefaultOptions } from 'node_modules/date-fns/_lib/defaultOptions';

import Container from '@components/container';
import HomeSection from '@components/home/home-section';
import PlaceImage from '@components/place-page/place-image';
import ContactItem from '@components/shared/contact-item';

import { namu } from '@fonts';

import type { StringWithLocales, WithLocale } from '@types';

import prisma from '@prisma-util';

import { getLocaleValue } from '@utils';

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
    setDefaultOptions({ locale: locale === 'uk' ? uk : enIN });
    const t = await getTranslations('pages.events');
    const event = await getEventBySlug(slug);

    if (!event) notFound();

    const eventTitle = getLocaleValue(event.name, locale);
    const eventDesc = getLocaleValue(event.desc, locale);
    const eventAddress = getLocaleValue(event.address, locale);

    return (
        <>
            <Container>
                {event.image && <PlaceImage src={event.image} alt={eventTitle} />}

                <h1 className={clsx(namu.className, 'mb-5 mt-10 text-4xl text-themeBg')}>
                    {eventTitle}
                </h1>
            </Container>

            <HomeSection>
                <div className="relative z-10 grid grid-cols-2 gap-10 rounded-3xl bg-themeSecondary p-6 shadow-main">
                    <ul className="flex flex-col gap-3">
                        <li>
                            <ContactItem icon="streets-map-point">{eventAddress}</ContactItem>
                        </li>

                        {event.phone && (
                            <li>
                                <ContactItem
                                    link
                                    icon="phone-calling"
                                    href={`tel:${event.phone.split(' ').join('')}`}
                                >
                                    {event.phone}
                                </ContactItem>
                            </li>
                        )}

                        {event.email && (
                            <li>
                                <ContactItem link icon="mailbox" href={`email:${event.email}`}>
                                    {event.email}
                                </ContactItem>
                            </li>
                        )}
                    </ul>

                    <ul className="flex flex-col gap-3">
                        {event.url && (
                            <li>
                                <ContactItem link icon="feed" href={event.url}>
                                    Сайт
                                </ContactItem>
                            </li>
                        )}

                        <li>
                            <ContactItem icon="calendar-add">
                                {format(event.start, 'HH:mm, PPPP')}
                            </ContactItem>
                        </li>

                        <li>
                            <ContactItem icon="hourglass-line">
                                {t('duration', { count: millisecondsToHours(event.duration) })}
                            </ContactItem>
                        </li>
                    </ul>
                </div>
            </HomeSection>

            <HomeSection title={'Про місце'}>
                <p className="relative z-10 text-justify">{eventDesc}</p>
            </HomeSection>
        </>
    );
};

export default EventsPage;
