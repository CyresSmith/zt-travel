import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';

import { format } from 'date-fns';
import { enIN, uk } from 'date-fns/locale';

import SingleItemPage from '@components/shared/single-item-page';

import type { WithLocale } from '@types';

import prisma from '@prisma-util';

import { getLocaleValue } from '@utils';

import getArticleBySlug from '@actions/articles/get-article-by-slug';

type Props = { params: { slug: string } & WithLocale };

export async function generateStaticParams() {
    const allArticles = await prisma.article.findMany();
    return allArticles.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params: { slug, locale } }: Props) {
    const article = await getArticleBySlug(slug);

    if (!article) {
        return { title: 'Some article', description: 'Some article description' };
    }

    const title = getLocaleValue(article.name, locale);
    const description = getLocaleValue(article.desc, locale);

    return {
        title,
        description,
    };
}

const ArticlesPage = async ({ params: { slug, locale } }: Props) => {
    const t = await getTranslations('pages.news');
    const article = await getArticleBySlug(slug);

    if (!article) notFound();

    return (
        <SingleItemPage
            title={getLocaleValue(article.name, locale)}
            image={article?.image || undefined}
            desc={getLocaleValue(article.text, locale)}
            similarTitle={t('similar')}
            similarPrefix="news"
            similarItems={article.similar?.map(({ image, name, slug, tags, desc, createdAt }) => ({
                image,
                title: getLocaleValue(name, locale),
                titleHref: slug,
                tags,
                locale,
                desc: getLocaleValue(desc, locale),
                links: [
                    {
                        icon: 'calendar-add',
                        label: format(createdAt, 'HH:mm, PPPP', {
                            locale: locale === 'uk' ? uk : enIN,
                        }),
                    },
                ],
            }))}
        />
    );
};

export default ArticlesPage;
