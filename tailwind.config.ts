import type { Config } from 'tailwindcss';

const config: Config = {
    darkMode: ['class'],
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        screens: {
            mobile: { min: '320px', max: '767px' },
            tablet: { min: '768px', max: '1279px' },
            desktop: { min: '1280px' },
        },
        fontSize: {
            xs: '10px',
            s: '12px',
            m: '14px',
            l: '18px',
            xl: '22px',
            xxl: '26px',
        },
        extend: {
            colors: {
                themeYellow: 'hsl(var(--theme-yellow))',
                themeGreen: 'hsl(var(--theme-green))',
                themePurple: 'hsl(var(--theme-purple))',
                themeRed: 'hsl(var(--theme-red))',
                backdrop: 'rgba(var(--backdrop))',
                background: 'hsl(var(--background))',
                foreground: 'hsl(var(--foreground))',
                card: {
                    DEFAULT: 'hsl(var(--card))',
                    foreground: 'hsl(var(--card-foreground))',
                },
                popover: {
                    DEFAULT: 'hsl(var(--popover))',
                    foreground: 'hsl(var(--popover-foreground))',
                },
                primary: {
                    DEFAULT: 'hsl(var(--primary))',
                    foreground: 'hsl(var(--primary-foreground))',
                },
                secondary: {
                    DEFAULT: 'hsl(var(--secondary))',
                    foreground: 'hsl(var(--secondary-foreground))',
                },
                muted: {
                    DEFAULT: 'hsl(var(--muted))',
                    foreground: 'hsl(var(--muted-foreground))',
                },
                accent: {
                    DEFAULT: 'hsl(var(--accent))',
                    foreground: 'hsl(var(--accent-foreground))',
                },
                destructive: {
                    DEFAULT: 'hsl(var(--destructive))',
                    foreground: 'hsl(var(--destructive-foreground))',
                },
                border: 'hsl(var(--border))',
                input: 'hsl(var(--input))',
                ring: 'hsl(var(--ring))',
                chart: {
                    '1': 'hsl(var(--chart-1))',
                    '2': 'hsl(var(--chart-2))',
                    '3': 'hsl(var(--chart-3))',
                    '4': 'hsl(var(--chart-4))',
                    '5': 'hsl(var(--chart-5))',
                },
            },
            borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)',
            },
            boxShadow: {
                main: `0px 1px 2.3px rgba(0, 0, 0, 0.017),
                       0px 2.4px 5.4px rgba(0, 0, 0, 0.025),
                       0px 4.3px 9.7px rgba(0, 0, 0, 0.029),
                       0px 7.1px 16.1px rgba(0, 0, 0, 0.034),
                       0px 10.9px 26.5px rgba(0, 0, 0, 0.04),
                       0px 16.3px 46.2px rgba(0, 0, 0, 0.051),
                       0px 24px 100px rgba(0, 0, 0, 0.07)`,
                hover: `0px 0.4px 0.6px rgba(0, 0, 0, 0.027),
                        0px 1px 1.3px rgba(0, 0, 0, 0.045),
                        0px 1.7px 2.3px rgba(0, 0, 0, 0.057),
                        0px 2.7px 3.9px rgba(0, 0, 0, 0.065),
                        0px 3.9px 6.3px rgba(0, 0, 0, 0.07),
                        0px 5.8px 11.1px rgba(0, 0, 0, 0.076),
                        0px 9px 24px rgba(0, 0, 0, 0.1)`,
                inputHover: `0 0 0 2px #ffc700`,
                inputActive: `0 0 0 3px #ffc700`,
                inputError: `0 0 0 3px #ED2B2A`,
            },
            animation: {
                opacity: 'animationOpacity 0.35s ease-in-out',
                patternScaleIn: 'patternScaleIn 15s ease-in-out',
            },
            keyframes: {
                animationOpacity: {
                    from: { opacity: '0.2' },
                    to: { opacity: '1' },
                },
                patternScaleIn: {
                    '0%': {
                        opacity: '0',
                        transform: 'scale(0.5)',
                    },
                    '50%': {
                        opacity: '1',
                        transform: 'scale(1)',
                    },
                    '100%': {
                        opacity: '0',
                        transform: 'scale(0.5)',
                    },
                },
            },
        },
    },
    plugins: [require('tailwindcss-animate')],
};
export default config;
