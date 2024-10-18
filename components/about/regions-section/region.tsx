import type { Dispatch, SetStateAction } from 'react';

import Image from 'next/image';

import clsx from 'clsx';

import Gradient from '@components/gradient';

import domik from '@assets/images/domik.jpeg';
import korosten from '@assets/images/korosten.jpg';
import kosmos from '@assets/images/kosmos-musem.jpg';
import zvyagel from '@assets/images/zvyagel.jpg';

import { namu } from '@fonts';

import {
    THEME_TRANSITION,
    berdychivDistrictId,
    korostenDistrictId,
    zhytomyrDistrictId,
    zvyagelDistrictId,
} from '@constants';

import { Link } from '@i18n/routing';

type Props = {
    id: string;
    slug: string;
    title: string;
    hoveredRegion: string | null;
    setHoveredRegion: Dispatch<SetStateAction<string | null>>;
};

const RegionItem = ({ id, slug, title, hoveredRegion, setHoveredRegion }: Props) => {
    const setImage = () => {
        switch (id) {
            case zhytomyrDistrictId:
                return kosmos;

            case berdychivDistrictId:
                return domik;

            case zvyagelDistrictId:
                return zvyagel;

            case korostenDistrictId:
                return korosten;

            default:
                return domik;
        }
    };

    return (
        <li
            onMouseEnter={() => setHoveredRegion(id)}
            onMouseLeave={() => setHoveredRegion(null)}
            className={clsx(
                'aspect-square overflow-hidden rounded-3xl bg-themeSecondary shadow-main',
                THEME_TRANSITION
            )}
        >
            <Link
                href={`district/${slug}`}
                className="relative z-0 flex h-full w-full flex-col justify-end"
            >
                <div className="absolute left-0 top-0 -z-10 h-full w-full">
                    <Image
                        src={setImage()}
                        layout="fill"
                        objectFit="cover"
                        quality={100}
                        alt="some"
                        className={clsx(THEME_TRANSITION, hoveredRegion === id && 'scale-110')}
                    />

                    <Gradient />
                </div>

                <h3
                    className={clsx(
                        'mb-5 flex h-[56px] max-w-[250px] -translate-x-5 items-center text-xl leading-7',
                        'before:mr-3 before:block before:h-full before:w-10 before:rounded-r-sm',
                        hoveredRegion === id && 'translate-x-0',
                        id === zvyagelDistrictId && 'before:bg-themeRed',
                        id === zhytomyrDistrictId && 'before:bg-themeGreen',
                        id === korostenDistrictId && 'before:bg-themeYellow',
                        id === berdychivDistrictId && 'before:bg-themePurple',
                        THEME_TRANSITION,
                        namu.className
                    )}
                >
                    {title}
                </h3>
            </Link>
        </li>
    );
};

export default RegionItem;
