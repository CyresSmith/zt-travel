import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: 'https://tic.com',
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 1,
            alternates: {
                languages: {
                    en: 'https://tic.com/en',
                    uk: 'https://tic.com/uk',
                },
            },
        },
        {
            url: 'https://tic.com/about',
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
            alternates: {
                languages: {
                    en: 'https://tic.com/en/about',
                    uk: 'https://tic.com/uk/about',
                },
            },
        },
        {
            url: 'https://tic.com/blog',
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.5,
            alternates: {
                languages: {
                    en: 'https://tic.com/en/blog',
                    uk: 'https://tic.com/uk/blog',
                },
            },
        },
    ];
}
