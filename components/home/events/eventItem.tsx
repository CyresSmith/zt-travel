import { getLocale } from 'next-intl/server';

import type { IconName } from '@lib/types/icon-names';
import { getLocaleValue } from '@lib/utils';
import { format } from 'date-fns';

import SectionCard from '../section-card/section-card';

import type { LocaleType } from '@i18n/routing';

import type { EventBasicInfo } from '@data/events/types';

type Props = { event: EventBasicInfo };

const EventItem = async ({
    event: { address, desc, duration, id, image, name, start, tags },
}: Props) => {
    const locale = await getLocale();

    const links = [
        { href: '', icon: 'calendar-add' as IconName, label: format(start, 'PPPP') },
        { href: '', icon: 'map-point' as IconName, label: getLocaleValue(address, locale) },
    ];

    return (
        <SectionCard
            image={image || ''}
            title={getLocaleValue(name, locale)}
            titleHref={`events/some-event`}
            tags={tags}
            links={links}
            locale={locale as LocaleType}
        />
    );
};

export default EventItem;
