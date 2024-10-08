'use client';

import { Fragment, useCallback, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

import { useLocale, useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';

import clsx from 'clsx';

import type { Option } from '@ui/multiple-select';
import MultipleSelector from '@ui/multiple-select';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@ui/select';

import Icon from '@components/icon';
import SectionCard from '@components/section-card/section-card';

import { getLocaleValue } from '@utils';

import { useCommunities } from '@data/community/queries';
import { useDistricts } from '@data/district/queries';
import { usePlaceCategories } from '@data/place-categories/queries';
import { usePlacesList } from '@data/places/queries';

import { type LocaleType, usePathname, useRouter } from '@i18n/routing';

const PlacesList = () => {
    const { ref, inView } = useInView();
    const locale = useLocale();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const router = useRouter();
    const t = useTranslations('places');

    const selectedCategoriesParam = searchParams.get('category');
    const selectedDistrictParam = searchParams.get('district');
    const selectedCommunityParam = searchParams.get('community');
    const selectedCategoriesSlugs = selectedCategoriesParam?.split(',') || [];

    const { data: categories } = usePlaceCategories();
    const { data: districts } = useDistricts();
    const { data: communities } = useCommunities();

    const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);
    const [selectedCommunity, setSelectedCommunity] = useState<string | undefined>(undefined);
    const [selectedDistrict, setSelectedDistrict] = useState<string | undefined>(undefined);

    const selectedCategories = categories?.filter(({ slug }) =>
        selectedCategoriesSlugs.includes(slug)
    );

    const { data, fetchNextPage, isFetching, isFetchingNextPage, hasNextPage } = usePlacesList({
        categories: selectedCategories?.map(({ id }) => id),
        districtId: selectedDistrictParam || undefined,
        communityId: selectedCommunityParam || undefined,
    });

    const isDataLoading = isFetching || isFetchingNextPage;

    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams.toString());
            params.set(name, value);

            if (name === 'district') {
                params.delete('community');
            }

            return params.toString();
        },
        [searchParams]
    );

    const handleCategorySelect = (options: Option[]) => {
        let href = pathname;

        if (options.length > 0) {
            const selected = options.map(({ value }) => value);

            const selectedCategories = categories?.reduce((acc: string, { name, slug }) => {
                const isSelected = selected.includes(getLocaleValue(name, locale));

                if (isSelected) {
                    acc = acc.length > 0 ? acc + ',' + slug : slug;
                }

                return acc;
            }, '');

            if (selectedCategories && selectedCategories?.length > 0) {
                href = `${href}?${createQueryString('category', selectedCategories)}`;
                router.push(href);
            }
        } else {
            if (selectedDistrictParam) {
                href = `${href}${href.includes('community') || href.includes('category') ? '&' : '?'}district=${selectedDistrictParam}`;
            }

            if (selectedCommunityParam) {
                href = `${href}${href.includes('district') || href.includes('category') ? '&' : '?'}community=${selectedCommunityParam}`;
            }

            return router.push(href);
        }
    };

    const handleRegionSelect = (value: string, type: 'district' | 'community') => {
        if (type === 'district') setSelectedCommunity('');

        let href = pathname;
        href = `${href}?${createQueryString(type, value)}`;
        router.push(href);
    };

    const handleRegionReset = (type: 'district' | 'community') => {
        let href = pathname;

        if (selectedCategoriesParam) {
            href = `${href}${href.includes('district') || href.includes('community') ? '&' : '?'}category=${selectedCategoriesParam}`;
        }

        if (type === 'community') {
            setSelectedCommunity('');

            if (selectedDistrictParam) {
                href = `${href}${href.includes('community') || href.includes('category') ? '&' : '?'}district=${selectedDistrictParam}`;
            }
        }

        if (type === 'district') {
            setSelectedDistrict('');

            if (selectedCommunityParam) {
                href = `${href.includes('district') || href.includes('category') ? '&' : '?'}community=${selectedCommunityParam}`;
            }
        }

        router.push(href);
    };

    useEffect(() => {
        if (!inView) return;

        fetchNextPage();
    }, [fetchNextPage, inView]);

    useEffect(() => {
        if (!selectedCategoriesParam) {
            if (selectedOptions) setSelectedOptions([]);
            return;
        }

        setSelectedOptions(
            selectedCategories?.map(({ name }) => {
                const value = getLocaleValue(name, locale);
                return { label: value, value };
            }) || []
        );
    }, [selectedCategoriesParam]);

    useEffect(() => {
        if (!selectedCommunityParam) return;

        setSelectedCommunity(selectedCommunityParam);
    }, [selectedCommunityParam]);

    useEffect(() => {
        if (!selectedDistrictParam) return;

        setSelectedDistrict(selectedDistrictParam);
    }, [selectedDistrictParam]);

    return (
        <>
            <div className="flex flex-col gap-10">
                <MultipleSelector
                    placeholder={t('select-category')}
                    value={selectedOptions}
                    onChange={handleCategorySelect}
                    defaultOptions={categories?.map(({ name }) => ({
                        label: getLocaleValue(name, locale),
                        value: getLocaleValue(name, locale),
                    }))}
                    emptyIndicator={
                        <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                            {t('category-not-found')}
                        </p>
                    }
                />

                <div className="mb-10 grid grid-cols-2 gap-8">
                    <Select
                        value={selectedDistrict}
                        onValueChange={value => handleRegionSelect(value, 'district')}
                    >
                        <SelectTrigger
                            value={selectedDistrict}
                            reset={() => handleRegionReset('district')}
                        >
                            <SelectValue placeholder={t('select-district')} />
                        </SelectTrigger>

                        <SelectContent>
                            {districts?.map(({ name_uk, name_en, id }) => (
                                <SelectItem key={id} value={id}>
                                    {locale === 'uk' ? name_uk : name_en}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    <Select
                        value={selectedCommunity}
                        onValueChange={value => handleRegionSelect(value, 'community')}
                    >
                        <SelectTrigger
                            value={selectedCommunity}
                            reset={() => handleRegionReset('community')}
                        >
                            <SelectValue placeholder={t('select-community')} />
                        </SelectTrigger>

                        <SelectContent>
                            {communities
                                ?.filter(({ districtId }) =>
                                    selectedDistrictParam
                                        ? districtId === selectedDistrictParam
                                        : true
                                )
                                ?.map(({ name_uk, name_en, id }) => (
                                    <SelectItem key={id} value={id}>
                                        {locale === 'uk' ? name_uk : name_en}
                                    </SelectItem>
                                ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {data && data?.pages[0] && data.pages[0].data.length > 0 ? (
                <ul className="grid gap-8 mobile:grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-3">
                    {data?.pages.map((group, i) => (
                        <Fragment key={i}>
                            {group?.data.map(
                                ({ name, image, slug, id, address, gmapsUrl, desc, category }) => (
                                    <SectionCard
                                        key={id}
                                        image={image || ''}
                                        title={getLocaleValue(name, locale)}
                                        titleHref={`places/${slug}`}
                                        locale={locale as LocaleType}
                                        links={[
                                            {
                                                label: getLocaleValue(address, locale),
                                                icon: 'point-on-map',
                                                href: gmapsUrl || undefined,
                                            },
                                        ]}
                                        desc={getLocaleValue(desc, locale)}
                                        tags={[
                                            {
                                                id: category.id,
                                                name: category.name,
                                                slug: `places?category=${category.slug}`,
                                            },
                                        ]}
                                    />
                                )
                            )}
                        </Fragment>
                    ))}
                </ul>
            ) : (
                <div className="flex max-h-full flex-1 items-center justify-center gap-10">
                    <p className="text-center text-3xl">{t('places-not-found')}</p>
                </div>
            )}

            {hasNextPage && (
                <div
                    ref={ref}
                    className={clsx('flex justify-center', {
                        ['invisible']: !isDataLoading,
                        ['mt-10']: hasNextPage,
                    })}
                >
                    {isDataLoading && (
                        <Icon
                            name="black-hole"
                            className="animate-spin fill-themeBg"
                            width={50}
                            height={50}
                        />
                    )}
                </div>
            )}
        </>
    );
};

export default PlacesList;
