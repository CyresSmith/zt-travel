import { Slot } from '@radix-ui/react-slot';
import * as React from 'react';

import { THEME_TRANSITION } from '@lib/constants';
import { cn } from '@lib/utils';
import { type VariantProps, cva } from 'class-variance-authority';

const buttonVariants = cva(
    `${THEME_TRANSITION} inline-flex items-center hover:shadow-button justify-center whitespace-nowrap rounded-full text-m font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50`,
    {
        variants: {
            variant: {
                default: 'bg-themePrimary fill-themeBg text-themeBg hover:bg-themePrimary/90',
                yellow: 'bg-themeYellow fill-themePrimary text-themePrimary hover:bg-themeYellow/90',
                red: 'bg-themeRed fill-themeBg text-themeBg hover:bg-themeRed/90',
                green: 'bg-themeGreen fill-themeBg text-themeBg hover:bg-themeGreen/90',
                purple: 'bg-themePurple fill-themeBg text-themeBg hover:bg-themePurple/90',
                outlineDark:
                    'border border-themePrimary bg-transparent fill-themeFg text-themeFg hover:bg-themeSecondary hover:text-themeBg hover:fill-themeBg',
                outlineLight:
                    'border border-themeBg bg-transparent fill-themeBg text-themeBg hover:bg-themeBg hover:text-themeFg hover:fill-themeFg',
                secondary: 'bg-themeSecondary fill-themeBg text-themeBg hover:bg-themeSecondary/80',
                ghostDark:
                    'bg-transparent fill-themeFg text-themeFg hover:shadow-none hover:fill-themePrimary hover:text-themePrimary',
                ghostLight:
                    'bg-transparent fill-themeBg text-themeBg hover:shadow-none hover:fill-themeYellow hover:text-themeYellow',
                linkLight:
                    'fill-themeBg text-themeBg underline-offset-4 hover:underline hover:shadow-none ',
                linkDark:
                    'fill-themeFg text-themeFg underline-offset-4 hover:underline hover:shadow-none ',
            },
            size: {
                default: 'px-4 py-2',
                sm: 'px-3 py-1 text-xs',
                lg: 'px-8  py-3',
                icon: 'h-9 w-9',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
        },
    }
);

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonVariants> {
    asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : 'button';
        return (
            <Comp
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                {...props}
            />
        );
    }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
