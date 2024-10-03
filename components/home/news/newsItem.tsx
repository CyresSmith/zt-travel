import { getLocale } from 'next-intl/server';

import type { IconName } from '@lib/types/icon-names';
import { getLocaleValue } from '@lib/utils';
import { format } from 'date-fns';

import SectionCard from '../section-card/section-card';

import type { LocaleType } from '@i18n/routing';

import type { ArticleBasicInfo } from '@data/articles/types';

type Props = { article: ArticleBasicInfo };

const EventItem = async ({ article: { desc, image, name, tags, createdAt, slug } }: Props) => {
    const locale = await getLocale();

    const links = [
        { href: '', icon: 'calendar-add' as IconName, label: format(createdAt, 'PPPP') },
    ];

    return (
        <SectionCard
            image={image || ''}
            title={getLocaleValue(name, locale)}
            titleHref={`news/${slug}`}
            tags={tags.map(tag => ({ ...tag, slug: `news/tag=${tag.slug}` }))}
            links={links}
            locale={locale as LocaleType}
            desc={getLocaleValue(desc, locale)}
        />
    );
};

export default EventItem;
