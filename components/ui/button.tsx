import { Slot } from '@radix-ui/react-slot';
import * as React from 'react';

import { THEME_TRANSITION } from '@lib/constants';
import { cn } from '@lib/utils';
import { type VariantProps, cva } from 'class-variance-authority';

const buttonVariants = cva(
    `${THEME_TRANSITION} inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50`,
    {
        variants: {
            variant: {
                default:
                    'bg-primary fill-primary-foreground text-primary-foreground shadow hover:bg-primary/90',
                yellow: 'bg-themeYellow fill-primary-foreground text-primary-foreground shadow hover:bg-themeYellow/90',
                red: 'bg-themeRed fill-primary-foreground text-primary-foreground shadow hover:bg-themeRed/90',
                green: 'bg-themeGreen fill-primary-foreground text-primary-foreground shadow hover:bg-themeGreen/90',
                purple: 'bg-themePurple fill-primary-foreground text-primary-foreground shadow hover:bg-themePurple/90',
                destructive:
                    'bg-destructive fill-destructive-foreground text-destructive-foreground shadow-sm hover:bg-destructive/90',
                outline:
                    'border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground',
                secondary:
                    'bg-secondary fill-secondary-foreground text-secondary-foreground shadow-sm hover:bg-secondary/80',
                ghost: 'hover:bg-accent hover:fill-accent-foreground hover:text-accent-foreground',
                link: 'fill-primary text-primary underline-offset-4 hover:underline',
            },
            size: {
                default: 'h-9 px-4 py-2',
                sm: 'h-8 rounded-md px-3 text-xs',
                lg: 'h-10 rounded-md px-8',
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
