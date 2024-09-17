import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'Житомирський обласний туристичний інформаційний центр',
        short_name: 'ЖОТІЦ',
        description:
            'Житомирський обласний туристичний інформаційний центр створений для сприяння та реалізації туристичного потенціалу Житомирщини. Тут Вам безкоштовно нададуть інформацію про туристичну інфраструктуру, архітектурну та культурну спадщину, екскурсії та можливості гарного дозвілля в Поліському краї.',
        categories: [
            'entertainment',
            'business',
            'education',
            'food',
            'government',
            'health',
            'kids',
            'lifestyle',
            'navigation',
            'news',
            'photo',
            'social',
            'sports',
            'travel',
        ],
        start_url: '/',
        display: 'standalone',
        background_color: '#3C3D37',
        theme_color: '#0079ff',
        icons: [
            {
                src: '/android-chrome-192x192.png',
                sizes: '192x192',
                type: 'image/png',
            },
            {
                src: '/android-chrome-512x512.png',
                sizes: '512x512',
                type: 'image/png',
            },
        ],
        screenshots: [
            {
                src: 'screens/screen1.png',
                sizes: '1280x720',
                type: 'image/png',
                form_factor: 'wide',
            },
            {
                src: 'screens/screen2.png',
                sizes: '320x640',
                type: 'image/png',
                form_factor: 'narrow',
            },
        ],
    };
}
