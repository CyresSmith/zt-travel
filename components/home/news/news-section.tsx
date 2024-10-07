'use client';

import { useTranslations } from 'next-intl';

import NewsItem from './news-item';

import HomeSection from '../home-section';
import SectionCarousel from '../section-carousel';

import { useArticles } from '@data/articles/queries';

const NewsSection = () => {
    const t = useTranslations('homePage');

    const { data: articles } = useArticles();

    return (
        <HomeSection title={t('news-title')} href={`news`} linkLabel={t('news-link-label')} light>
            <SectionCarousel
                items={articles?.map((article, i) => <NewsItem key={i} article={article} />)}
            />
        </HomeSection>
    );
};

export default NewsSection;
