import Image from 'next/image';

import { THEME_TRANSITION } from '@lib/constants';
import type { IconName } from '@lib/types/icon-names';
import clsx from 'clsx';

import CardLink from './card-link';

import karier from '@assets/images/druzhbivskyy-karier.jpg';

import { Link } from '@i18n/routing';

type Tag = {
    label: string;
    href: string;
};

type Props = {
    image: string;
    title: string;
    titleHref: string;
    tags?: Tag[];
    links: { label: string; href: string; icon: IconName }[];
};

const SectionCard = async ({ image, title, titleHref, tags, links }: Props) => {
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
                        {tags.map(({ href, label }) => (
                            <li
                                key={href}
                                className={`rounded-full bg-themeYellow/70 px-2 py-1 text-m font-semibold hover:bg-themeYellow ${THEME_TRANSITION}`}
                            >
                                <Link href={href}>{label}</Link>
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
                            <li key={link.href}>
                                <CardLink {...link} />
                            </li>
                        ))}
                </ul>
            </div>
        </li>
    );
};

export default SectionCard;
