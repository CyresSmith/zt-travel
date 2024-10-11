import { useLocale } from 'next-intl';

import { format, setDefaultOptions } from 'date-fns';
import { enIN, uk } from 'date-fns/locale';

import SectionCard from '../../section-card/section-card';

import type { IconName } from '@icon-names';

import { getLocaleValue } from '@utils';

import type { ArticleBasicInfo } from '@data/articles/types';

import type { LocaleType } from '@i18n/routing';

type Props = { article: ArticleBasicInfo };

const EventItem = ({ article: { desc, image, name, tags, createdAt, slug } }: Props) => {
    const locale = useLocale();
    setDefaultOptions({ locale: locale === 'uk' ? uk : enIN });

    const links = [
        { href: '', icon: 'calendar-add' as IconName, label: format(createdAt, 'HH:mm, PPPP') },
    ];

    return (
        <SectionCard
            image={image || ''}
            title={getLocaleValue(name, locale)}
            titleHref={`news/${slug}`}
            tags={tags.map(tag => ({ ...tag, slug: `news?tags=${tag.slug}` }))}
            links={links}
            locale={locale as LocaleType}
            desc={getLocaleValue(desc, locale)}
        />
    );
};

export default EventItem;
