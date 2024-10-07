'use client';

import { Fragment, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

import { useLocale } from 'next-intl';
import { useSearchParams } from 'next/navigation';

import clsx from 'clsx';

import { Button } from '@ui/button';
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

import { Link, type LocaleType, useRouter } from '@i18n/routing';

const PlacesList = () => {
    const { ref, inView } = useInView();
    const locale = useLocale();
    const params = useSearchParams();
    const router = useRouter();

    const selectedCategoriesParam = params.get('category');
    const selectedCategoriesSlugs = selectedCategoriesParam?.split(',') || [];

    const { data: categories } = usePlaceCategories();
    const { data: districts } = useDistricts();
    const { data: communities } = useCommunities();

    const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);

    const selectedCategories = categories?.filter(({ slug }) =>
        selectedCategoriesSlugs.includes(slug)
    );

    const { data, fetchNextPage, isFetching, isFetchingNextPage, hasNextPage } = usePlacesList({
        categories: selectedCategories?.map(({ id }) => id),
    });

    const isDataLoading = isFetching || isFetchingNextPage;

    const handleCategorySelect = (options: Option[]) => {
        let href = '/places';

        if (options.length > 0) {
            const selected = options.map(({ value }) => value);

            const selectedCategories = categories?.reduce((acc: string, { name, slug }) => {
                const isSelected = selected.includes(getLocaleValue(name, locale));

                if (isSelected) {
                    acc = acc ? acc + ',' + slug : slug;
                }

                return acc;
            }, '');

            href = `${href}?category=${selectedCategories}`;
        }

        router.push(href);
    };

    useEffect(() => {
        if (!inView) return;

        fetchNextPage();
    }, [fetchNextPage, inView]);

    useEffect(() => {
        setSelectedOptions(
            selectedCategories?.map(({ name }) => {
                const value = getLocaleValue(name, locale);
                return { label: value, value };
            }) || []
        );
    }, []);

    return (
        <>
            <div className="mb-10 grid grid-cols-3 gap-8">
                <MultipleSelector
                    value={selectedOptions}
                    onChange={handleCategorySelect}
                    defaultOptions={categories?.map(({ name }) => ({
                        label: getLocaleValue(name, locale),
                        value: getLocaleValue(name, locale),
                    }))}
                    maxSelected={5}
                    emptyIndicator={
                        <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                            no results found.
                        </p>
                    }
                />

                <Select>
                    <SelectTrigger>
                        <SelectValue placeholder={'Select district'} />
                    </SelectTrigger>

                    <SelectContent>
                        {districts?.map(({ name_uk, name_en, id }) => (
                            <SelectItem key={id} value={id}>
                                {locale === 'uk' ? name_uk : name_en}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                <Select>
                    <SelectTrigger>
                        <SelectValue placeholder={'Select community'} />
                    </SelectTrigger>

                    <SelectContent>
                        {communities?.map(({ name_uk, name_en, id }) => (
                            <SelectItem key={id} value={id}>
                                {locale === 'uk' ? name_uk : name_en}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
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
                                        tags={[{ id: category.id, name: category.name }]}
                                    />
                                )
                            )}
                        </Fragment>
                    ))}
                </ul>
            ) : (
                <div className="flex flex-col items-center gap-10">
                    <p className="text-center text-3xl">Places not found!</p>

                    <Button asChild>
                        <Link href={'places'}>Reset filter</Link>
                    </Button>
                </div>
            )}

            {hasNextPage && (
                <div
                    ref={ref}
                    className={clsx('mt-10 flex justify-center', { ['invisible']: !isDataLoading })}
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
