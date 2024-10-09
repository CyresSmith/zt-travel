'use client';

import { useLocale } from 'next-intl';

import { format } from 'date-fns';
import { enIN, uk } from 'date-fns/locale';

import SectionCard from '../../section-card/section-card';

import type { IconName } from '@icon-names';

import { getLocaleValue } from '@utils';

import type { EventBasicInfo } from '@data/events/types';

import type { LocaleType } from '@i18n/routing';

type Props = { event: EventBasicInfo };

const EventItem = ({ event: { address, image, name, start, tags, slug } }: Props) => {
    const locale = useLocale();

    const links = [
        {
            href: '',
            icon: 'calendar-add' as IconName,
            label: format(start, 'HH:mm, PPPP', { locale: locale === 'uk' ? uk : enIN }),
        },
        { href: '', icon: 'map-point' as IconName, label: getLocaleValue(address, locale) },
    ];

    return (
        <SectionCard
            image={image || ''}
            title={getLocaleValue(name, locale)}
            titleHref={`events/${slug}`}
            tags={tags.map(tag => ({ ...tag, slug: `events?tags=${tag.slug}` }))}
            links={links}
            locale={locale as LocaleType}
        />
    );
};

export default EventItem;
