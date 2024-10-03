import { getTranslations } from 'next-intl/server';

import NewsItem from './newsItem';

import HomeSection from '../home-section';
import SectionCarousel from '../section-carousel';

import { getArticles } from '@data/articles';

const NewsSection = async () => {
    const t = await getTranslations('homePage');
    const articles = await getArticles({ take: 6 });

    return (
        <HomeSection title={t('news-title')} href={`news`} linkLabel={t('news-link-label')} light>
            <SectionCarousel
                items={articles.map((article, i) => (
                    <NewsItem key={i} article={article} />
                ))}
            />
        </HomeSection>
    );
};

export default NewsSection;
