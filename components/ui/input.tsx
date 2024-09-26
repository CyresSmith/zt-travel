import * as React from 'react';

import { INPUT_STYLES, THEME_TRANSITION } from '@lib/constants';
import { cn } from '@lib/utils';

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
                    className,
                    'focus:outline-none',
                    'focus:shadow-none',
                    THEME_TRANSITION,
                    INPUT_STYLES,
                    error &&
                        'shadow-inputError hover:shadow-inputError focus-visible:shadow-inputError focus-visible:hover:shadow-inputError'
                )}
                ref={ref}
                {...props}
            />
        );
    }
);
Input.displayName = 'Input';

export { Input };
