'use client';

import { Fragment, useCallback, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

import { useLocale, useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';

import clsx from 'clsx';

import type { Option } from '@ui/multiple-select';

import Icon from '@components/icon';
import SectionCard from '@components/section-card/section-card';
import ListFilterPanel from '@components/shared/list-filter-panel';

import { buildUrl, getLocaleValue, stringifyQueryParams } from '@utils';

import { usePlaceCategories } from '@data/place-categories/queries';
import { usePlacesList } from '@data/places/queries';

import { type LocaleType, usePathname, useRouter } from '@i18n/routing';

const PlacesList = () => {
    const { ref, inView } = useInView();
    const locale = useLocale();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const router = useRouter();
    const t = useTranslations('pages.places');

    const selectedCategoriesParam = searchParams.get('category');
    const selectedDistrictIdParam = searchParams.get('district');
    const selectedCommunityIdParam = searchParams.get('community');

    const selectedCategoriesSlugs = selectedCategoriesParam?.split(',') || [];

    const { data: categories } = usePlaceCategories();

    const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);
    const [selectedDistrictId, setSelectedDistrictId] = useState<string | undefined>(undefined);
    const [selectedCommunityId, setSelectedCommunityId] = useState<string | undefined>(undefined);

    const selectedCategories = categories?.filter(({ slug }) =>
        selectedCategoriesSlugs.includes(slug)
    );

    const { data, fetchNextPage, isFetching, isFetchingNextPage, hasNextPage, isLoading } =
        usePlacesList({
            categories: selectedCategories?.map(({ id }) => id) || [],
            districtId: selectedDistrictId,
            communityId: selectedCommunityId,
        });

    const isDataLoading = isFetching || isFetchingNextPage || isLoading;

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
            if (selectedDistrictId || selectedCommunityId) {
                handleRegionSelect(true);
            } else {
                return router.push(href);
            }
        }
    };

    const handleRegionSelect = (skipCategories?: boolean) => {
        let href = pathname;

        if (!skipCategories && selectedCategoriesParam) {
            href = `${href}${href.includes('district') || href.includes('community') ? '&' : '?'}category=${selectedCategoriesParam}`;
        }

        if (selectedDistrictId) {
            href = `${href}${href.includes('category') ? '&' : '?'}district=${selectedDistrictId}`;
        }

        if (selectedCommunityId) {
            href = `${href}&community=${selectedCommunityId}`;
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
        handleRegionSelect();
    }, [selectedCommunityId, selectedDistrictId]);

    useEffect(() => {
        if (!selectedDistrictIdParam) setSelectedDistrictId(undefined);
        if (!selectedCommunityIdParam) setSelectedCommunityId(undefined);
    }, [selectedDistrictIdParam, selectedCommunityIdParam]);

    return (
        <>
            <ListFilterPanel
                optionsPlaceholder={t('select-category')}
                selectedOptions={selectedOptions}
                onOptionChange={handleCategorySelect}
                options={
                    categories?.map(({ name }) => ({
                        label: getLocaleValue(name, locale),
                        value: getLocaleValue(name, locale),
                    })) || []
                }
                emptyOptionsLabel={t('category-not-found')}
                selectedDistrictId={selectedDistrictId || ''}
                setSelectedDistrictId={setSelectedDistrictId}
                selectedCommunityId={selectedCommunityId || ''}
                setSelectedCommunityId={setSelectedCommunityId}
            />

            {data && data?.pages[0] && data.pages[0].data.length > 0 ? (
                <ul className="grid gap-5 mobile:grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-3">
                    {data?.pages.map((group, i) => (
                        <Fragment key={i}>
                            {group?.data.map(
                                ({ name, image, slug, id, address, gmapsUrl, desc, category }) => (
                                    <SectionCard
                                        key={id}
                                        image={image || ''}
                                        title={getLocaleValue(name, locale)}
                                        titleHref={buildUrl('places', slug)}
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
                                                slug: `${buildUrl('places')}?${stringifyQueryParams({ category: category.slug })}`,
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
