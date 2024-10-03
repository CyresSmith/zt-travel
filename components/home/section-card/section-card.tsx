import Image from 'next/image';

import { THEME_TRANSITION } from '@lib/constants';
import type { IconName } from '@lib/types/icon-names';
import { getLocaleValue } from '@lib/utils';
import clsx from 'clsx';

import CardLink from './card-link';

import karier from '@assets/images/druzhbivskyy-karier.jpg';

import type { LocaleType } from '@i18n/routing';
import { Link } from '@i18n/routing';

import type { TagBasicInfo } from '@data/tags/types';

type Props = {
    image: string;
    title: string;
    titleHref: string;
    tags: TagBasicInfo[];
    links: { label: string; href: string; icon: IconName }[];
    locale: LocaleType;
};

const SectionCard = async ({ image, title, titleHref, tags, links, locale }: Props) => {
    return (
        <li
            className={clsx(
                'flex h-[400px] flex-col overflow-hidden rounded-3xl bg-themeBg text-themeFg shadow-main'
            )}
        >
            <div className="relative h-[50%] w-full">
                <Image
                    src={image || karier}
                    alt={title}
                    placeholder="empty"
                    quality={100}
                    fill
                    style={{
                        objectFit: 'cover',
                    }}
                />

                {tags && tags.length > 0 && (
                    <ul className="absolute left-5 top-5 flex flex-col items-start gap-2">
                        {tags.map(({ id, name }) => (
                            <li
                                key={id}
                                className={`rounded-full bg-themeYellow/80 px-2 py-1 text-m text-themeFg hover:bg-themeYellow ${THEME_TRANSITION}`}
                            >
                                <Link href={`events?tag=${id}`}>
                                    {getLocaleValue(name, locale)}
                                </Link>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <div className="flex flex-1 flex-col justify-between gap-4 p-5">
                <Link href={titleHref}>
                    <h4
                        className={`line-clamp-2 w-full overflow-hidden text-ellipsis text-xl font-bold hover:text-themePurple ${THEME_TRANSITION}`}
                    >
                        {title}
                    </h4>
                </Link>

                <ul className="flex flex-col gap-2">
                    {links &&
                        links.length > 0 &&
                        links.map(link => (
                            <li key={link.label}>
                                <CardLink {...link} />
                            </li>
                        ))}
                </ul>
            </div>
        </li>
    );
};

export default SectionCard;
