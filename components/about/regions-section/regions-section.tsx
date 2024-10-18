'use client';

import { useState } from 'react';

import clsx from 'clsx';

import DistrictsMap from './districts-map';
import RegionsList from './regions-list';

import AboutPageSection from '../about-page-section';

import { namu } from '@fonts';

import { useDistricts } from '@data/district/queries';

type Props = { title: string };

const RegionsSection = ({ title }: Props) => {
    const { data: districts } = useDistricts();

    const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);

    const slug = hoveredRegion
        ? districts?.find(({ id }) => id === hoveredRegion)?.slug
        : undefined;

    return (
        <AboutPageSection>
            <h2 className={clsx('mb-10 text-xxl text-themeYellow', namu.className)}>{title}</h2>

            <div className="grid grid-cols-2">
                <RegionsList hoveredRegion={hoveredRegion} setHoveredRegion={setHoveredRegion} />
                <DistrictsMap activeRegionSlug={slug} setRegion={setHoveredRegion} />
            </div>
        </AboutPageSection>
    );
};

export default RegionsSection;
