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
            mobile: {
                min: '320px',
                max: '767px',
            },
            tablet: {
                min: '768px',
                max: '1279px',
            },
            desktop: {
                min: '1280px',
            },
        },
        extend: {
            fontFamily: {
                sans: ['var(--font-nunito)'],
                heading: ['var(--font-namu)'],
            },
            fontSize: {
                xs: '12px',
                s: '14px',
                m: '16px',
                l: '20px',
                xl: '26px',
                xxl: '32px',
            },
            colors: {
                themeYellow: 'hsl(var(--theme-yellow))',
                themeGreen: 'hsl(var(--theme-green))',
                themePurple: 'hsl(var(--theme-purple))',
                themeRed: 'hsl(var(--theme-red))',
                backdrop: 'rgba(var(--backdrop))',
                themeBg: 'hsl(var(--theme-bg))',
                themeFg: 'hsl(var(--theme-fg))',
                themePrimary: 'hsl(var(--theme-primary))',
                themeSecondary: 'hsl(var(--theme-secondary))',
            },
            borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)',
            },
            boxShadow: {
                button: '`\n                        0px 0.1px 0.6px -4px rgba(0, 0, 0, 0.062),\n                        0px 0.2px 1.4px -4px rgba(0, 0, 0, 0.108),\n                        0px 0.3px 2.3px -4px rgba(0, 0, 0, 0.141),\n                        0px 0.4px 3.5px -4px rgba(0, 0, 0, 0.162),\n                        0px 0.5px 4.9px -4px rgba(0, 0, 0, 0.177),\n                        0px 0.6px 6.7px -4px rgba(0, 0, 0, 0.196),\n                        0px 1px 9px -4px rgba(0, 0, 0, 0.25)\n                        `',
                buttonHover:
                    '`\n                        0px 0.5px 0.9px -7px rgba(0, 0, 0, 0.038),\n                        0px 0.9px 2px -7px rgba(0, 0, 0, 0.069),\n                        0px 1.4px 3.4px -7px rgba(0, 0, 0, 0.094),\n                        0px 1.9px 5.1px -7px rgba(0, 0, 0, 0.114),\n                        0px 2.4px 7px -7px rgba(0, 0, 0, 0.131),\n                        0px 3.1px 9.4px -7px rgba(0, 0, 0, 0.148),\n                        0px 4px 12.3px -7px rgba(0, 0, 0, 0.171),\n                        0px 6px 16px -7px rgba(0, 0, 0, 0.25)`',
                main: '`\n                        0px 3.6px 9.8px -51px rgba(0, 0, 0, 0.029),\n                        0px 6px 16.5px -51px rgba(0, 0, 0, 0.051),\n                        0px 7.9px 21.9px -51px rgba(0, 0, 0, 0.069),\n                        0px 9.6px 26.7px -51px rgba(0, 0, 0, 0.084),\n                        0px 11.2px 31.1px -51px rgba(0, 0, 0, 0.097),\n                        0px 12.8px 35.5px -51px rgba(0, 0, 0, 0.109),\n                        0px 14.5px 40.1px -51px rgba(0, 0, 0, 0.121),\n                        0px 16.5px 45.4px -51px rgba(0, 0, 0, 0.132),\n                        0px 19.1px 52.3px -51px rgba(0, 0, 0, 0.144),\n                        0px 25px 65px -51px rgba(0, 0, 0, 0.17)\n                        `',
                hover: '`0px 0.4px 0.6px rgba(0, 0, 0, 0.027),\n                        0px 1px 1.3px rgba(0, 0, 0, 0.045),\n                        0px 1.7px 2.3px rgba(0, 0, 0, 0.057),\n                        0px 2.7px 3.9px rgba(0, 0, 0, 0.065),\n                        0px 3.9px 6.3px rgba(0, 0, 0, 0.07),\n                        0px 5.8px 11.1px rgba(0, 0, 0, 0.076),\n                        0px 9px 24px rgba(0, 0, 0, 0.1)`',
                inputHover: '`0 0 0 2px hsl(var(--theme-yellow))`',
                inputActive: '`0 0 0 3px hsl(var(--theme-yellow))`',
                inputError: '`0 0 0 3px hsl(var(--theme-red))`',
            },
            animation: {
                slideDownAndFade: 'slideDownAndFade 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                slideLeftAndFade: 'slideLeftAndFade 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                slideUpAndFade: 'slideUpAndFade 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                slideRightAndFade: 'slideRightAndFade 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                opacity: 'animationOpacity 0.35s ease-in-out',
                patternScaleIn: 'patternScaleIn 15s ease-in-out',
                'accordion-down': 'accordion-down 0.2s ease-out',
                'accordion-up': 'accordion-up 0.2s ease-out',
            },
            keyframes: {
                slideDownAndFade: {
                    from: {
                        opacity: '0',
                        transform: 'translateY(-2px)',
                    },
                    to: {
                        opacity: '1',
                        transform: 'translateY(0)',
                    },
                },
                slideLeftAndFade: {
                    from: {
                        opacity: '0',
                        transform: 'translateX(2px)',
                    },
                    to: {
                        opacity: '1',
                        transform: 'translateX(0)',
                    },
                },
                slideUpAndFade: {
                    from: {
                        opacity: '0',
                        transform: 'translateY(2px)',
                    },
                    to: {
                        opacity: '1',
                        transform: 'translateY(0)',
                    },
                },
                slideRightAndFade: {
                    from: {
                        opacity: '0',
                        transform: 'translateX(-2px)',
                    },
                    to: {
                        opacity: '1',
                        transform: 'translateX(0)',
                    },
                },
                animationOpacity: {
                    from: {
                        opacity: '0.2',
                    },
                    to: {
                        opacity: '1',
                    },
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
                'accordion-down': {
                    from: {
                        height: '0',
                    },
                    to: {
                        height: 'var(--radix-accordion-content-height)',
                    },
                },
                'accordion-up': {
                    from: {
                        height: 'var(--radix-accordion-content-height)',
                    },
                    to: {
                        height: '0',
                    },
                },
            },
        },
    },
    plugins: [require('tailwindcss-animate')],
};
export default config;
