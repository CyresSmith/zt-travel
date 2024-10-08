import * as React from 'react';

import { cn } from '@utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    error?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, error, ...props }, ref) => {
        return (
            <input
                type={type}
                className={cn(
                    `file:text-foreground w-full outline-none file:border-0 file:bg-transparent file:text-sm file:font-medium`,
                    'transition-all duration-300 ease-in-out',
                    'flex h-[40px] rounded-full bg-themeBg px-4 py-2 text-m text-themeFg placeholder:text-themeFg/50 hover:shadow-inputHover focus-visible:shadow-inputActive focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
                    'focus:shadow-none focus:outline-none',
                    error &&
                        'shadow-inputError hover:shadow-inputError focus-visible:shadow-inputError focus-visible:hover:shadow-inputError',
                    className
                )}
                ref={ref}
                {...props}
            />
        );
    }
);
Input.displayName = 'Input';

export { Input };
