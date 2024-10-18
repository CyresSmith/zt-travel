'use client';

import type { Dispatch, SetStateAction } from 'react';

import { useLocale } from 'next-intl';

import RegionItem from './region';

import { useDistricts } from '@data/district/queries';

type Props = {
    hoveredRegion: string | null;
    setHoveredRegion: Dispatch<SetStateAction<string | null>>;
};

const RegionsList = ({ hoveredRegion, setHoveredRegion }: Props) => {
    const locale = useLocale();
    const { data: districts } = useDistricts();

    return (
        <>
            <ul className="grid grid-cols-2 grid-rows-2 gap-5">
                {districts?.map(({ id, name_en, name_uk, slug }) => (
                    <RegionItem
                        key={id}
                        id={id}
                        slug={slug}
                        hoveredRegion={hoveredRegion}
                        setHoveredRegion={setHoveredRegion}
                        title={(locale === 'uk' ? name_uk : name_en) || ''}
                    />
                ))}
            </ul>
        </>
    );
};

export default RegionsList;
