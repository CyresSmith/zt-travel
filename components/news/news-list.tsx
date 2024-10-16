'use client';

import { Fragment, useCallback, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

import { useLocale, useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';

import clsx from 'clsx';

import type { Option } from '@ui/multiple-select';
import MultipleSelector from '@ui/multiple-select';

import Icon from '@components/icon';
import SectionCard from '@components/section-card/section-card';

import { getLocaleValue } from '@utils';

import { useArticlesList } from '@data/articles/queries';
import { useArticleTags } from '@data/tags/queries';

import { type LocaleType, usePathname, useRouter } from '@i18n/routing';

const NewsList = () => {
    const { ref, inView } = useInView();
    const locale = useLocale();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const router = useRouter();
    const t = useTranslations('pages.news');

    const selectedTagsParam = searchParams.get('tags');
    const selectedTagsSlugs = selectedTagsParam?.split(',');

    const { data: tags } = useArticleTags();

    const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);

    const selectedTags = tags?.filter(({ slug }) => selectedTagsSlugs?.includes(slug));

    const { data, fetchNextPage, isFetching, isFetchingNextPage, hasNextPage } = useArticlesList({
        tags: selectedTags?.map(({ id }) => id),
    });

    const isDataLoading = isFetching || isFetchingNextPage;

    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams.toString());
            params.set(name, value);

            return params.toString();
        },
        [searchParams]
    );

    const handleTagSelect = (options: Option[]) => {
        let href = pathname;

        if (options.length > 0) {
            const selected = options.map(({ value }) => value);

            const selectedTags = tags?.reduce((acc: string, { name, slug }) => {
                const isSelected = selected.includes(getLocaleValue(name, locale));

                if (isSelected) {
                    acc = acc.length > 0 ? acc + ',' + slug : slug;
                }

                return acc;
            }, '');

            if (selectedTags && selectedTags?.length > 0) {
                href = `${href}?${createQueryString('tags', selectedTags)}`;
                router.push(href);
            }
        } else {
            return router.push(href);
        }
    };

    useEffect(() => {
        if (!inView) return;

        fetchNextPage();
    }, [fetchNextPage, inView]);

    useEffect(() => {
        if (!selectedTagsParam) {
            if (selectedOptions) setSelectedOptions([]);
            return;
        }

        setSelectedOptions(
            selectedTags?.map(({ name }) => {
                const value = getLocaleValue(name, locale);
                return { value, label: value };
            }) || []
        );
    }, [selectedTagsParam]);

    return (
        <>
            <div className="mb-10">
                <MultipleSelector
                    placeholder={t('select-tag')}
                    value={selectedOptions}
                    onChange={handleTagSelect}
                    defaultOptions={tags?.map(({ name }) => {
                        const value = getLocaleValue(name, locale);

                        return { value, label: value };
                    })}
                    emptyIndicator={
                        <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                            {t('tag-not-found')}
                        </p>
                    }
                />
            </div>

            {data && data?.pages[0] && data.pages[0].data.length > 0 ? (
                <ul className="grid gap-8 mobile:grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-3">
                    {data?.pages.map((group, i) => (
                        <Fragment key={i}>
                            {group?.data.map(({ name, image, slug, id, desc, tags }) => (
                                <SectionCard
                                    key={id}
                                    image={image || ''}
                                    title={getLocaleValue(name, locale)}
                                    titleHref={`news/${slug}`}
                                    locale={locale as LocaleType}
                                    desc={getLocaleValue(desc, locale)}
                                    tags={tags.map(({ slug, ...tag }) => ({
                                        ...tag,
                                        slug: `news?tags=${slug}`,
                                    }))}
                                />
                            ))}
                        </Fragment>
                    ))}
                </ul>
            ) : (
                <div className="flex max-h-full flex-1 items-center justify-center gap-10">
                    <p className="text-center text-3xl">{t('news-not-found')}</p>
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

export default NewsList;
