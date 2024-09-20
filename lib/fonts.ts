import { Nunito } from 'next/font/google';
import localFont from 'next/font/local';

export const nunito = Nunito({
    weight: ['200', '300', '400', '500', '600', '700', '800', '900', '1000'],
    subsets: ['latin', 'cyrillic-ext', 'cyrillic'],
    variable: '--font-nunito',
});

export const namu = localFont({
    src: [
        {
            path: '../assets/fonts/NAMU-1400.ttf',
            weight: '400',
        },
    ],
    variable: '--font-namu',
});
