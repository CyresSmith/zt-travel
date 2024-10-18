'use client';

import type { Dispatch, PropsWithChildren, SetStateAction } from 'react';

import { useLocale, useTranslations } from 'next-intl';

import type { Option } from '@ui/multiple-select';
import MultipleSelector from '@ui/multiple-select';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@ui/select';

import { useCommunities } from '@data/community/queries';
import { useDistricts } from '@data/district/queries';

type SelectItem = { label: string; value: string };

type Props = {
    optionsPlaceholder: string;
    emptyOptionsLabel: string;
    selectedOptions: Option[];
    options: Option[];
    onOptionChange: (options: Option[]) => void;

    selectedCommunityId?: string;
    setSelectedCommunityId?: Dispatch<SetStateAction<string | undefined>>;
    selectedDistrictId?: string;
    setSelectedDistrictId?: Dispatch<SetStateAction<string | undefined>>;
} & PropsWithChildren;

const ListFilterPanel = ({
    optionsPlaceholder,
    emptyOptionsLabel,
    selectedOptions,
    options,
    onOptionChange,
    children,
    selectedDistrictId,
    setSelectedDistrictId,
    selectedCommunityId,
    setSelectedCommunityId,
}: Props) => {
    const locale = useLocale();
    const { data: districts } = useDistricts();
    const { data: communities } = useCommunities();
    const t = useTranslations('pages.list-filter-panel');

    const communitiesForSelect =
        communities?.filter(({ districtId }) =>
            selectedDistrictId ? districtId === selectedDistrictId : true
        ) || [];

    const handleRegionSelect = (region: string, type: 'district' | 'community') => {
        if (type === 'district') {
            setSelectedCommunityId && setSelectedCommunityId('');
            setSelectedDistrictId && setSelectedDistrictId(region);
        }

        if (type === 'community') {
            const selected = communities?.find(({ id }) => id === region);

            setSelectedDistrictId && setSelectedDistrictId(selected?.districtId);
            setSelectedCommunityId && setSelectedCommunityId(region);
        }
    };

    const handleRegionReset = (type: 'district' | 'community') => {
        setSelectedCommunityId && setSelectedCommunityId('');
        if (type === 'district' && setSelectedDistrictId) setSelectedDistrictId('');
    };

    return (
        <div className="mb-10 flex flex-col gap-5">
            {setSelectedDistrictId && setSelectedCommunityId && (
                <div className="grid grid-cols-2 gap-5">
                    <Select
                        value={selectedDistrictId}
                        onValueChange={(value: string) => handleRegionSelect(value, 'district')}
                    >
                        <SelectTrigger
                            value={selectedDistrictId}
                            reset={() => handleRegionReset('district')}
                        >
                            <SelectValue placeholder={t('districts-placeholder')} />
                        </SelectTrigger>

                        <SelectContent>
                            {districts?.map(({ id, name_en, name_uk }) => {
                                return (
                                    <SelectItem key={id} value={id}>
                                        {locale === 'uk' ? name_uk : name_en}
                                    </SelectItem>
                                );
                            }) || []}
                        </SelectContent>
                    </Select>

                    <Select
                        value={selectedCommunityId}
                        onValueChange={(value: string) => handleRegionSelect(value, 'community')}
                    >
                        <SelectTrigger
                            value={selectedCommunityId}
                            reset={() => handleRegionReset('community')}
                        >
                            <SelectValue placeholder={t('communities-placeholder')} />
                        </SelectTrigger>

                        <SelectContent>
                            {communitiesForSelect?.map(({ id, name_en, name_uk }) => {
                                return (
                                    <SelectItem key={id} value={id}>
                                        {locale === 'uk' ? name_uk : name_en}
                                    </SelectItem>
                                );
                            }) || []}
                        </SelectContent>
                    </Select>
                </div>
            )}

            {children}

            <MultipleSelector
                placeholder={optionsPlaceholder}
                value={selectedOptions}
                onChange={onOptionChange}
                defaultOptions={options}
                emptyIndicator={
                    <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                        {emptyOptionsLabel}
                    </p>
                }
            />
        </div>
    );
};

export default ListFilterPanel;
