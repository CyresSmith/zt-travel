'use client';

import { useTranslations } from 'next-intl';

import NewsItem from './news-item';

import HomeSection from '../home-section';
import SectionCarousel from '../section-carousel';

import { useNewestArticles } from '@data/articles/queries';

const NewsSection = () => {
    const t = useTranslations('homePage');

    const { data: articles } = useNewestArticles();

    return (
        <HomeSection title={t('news-title')}>
            <SectionCarousel
                items={articles?.map((article, i) => <NewsItem key={i} article={article} />)}
                href={`news`}
                linkLabel={t('news-link-label')}
            />
        </HomeSection>
    );
};

export default NewsSection;
