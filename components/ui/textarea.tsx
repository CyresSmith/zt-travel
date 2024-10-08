import * as React from 'react';

import { cn } from '@utils';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    error?: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ className, error, ...props }, ref) => {
        return (
            <textarea
                className={cn(
                    `flex min-h-[60px] w-full rounded-3xl focus-visible:outline-none`,
                    'transition-all duration-300 ease-in-out',
                    'flex bg-themeBg px-4 py-2 text-m text-themeFg placeholder:text-themeFg/50 hover:shadow-inputHover focus-visible:shadow-inputActive focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
                    'outline-none focus:shadow-none focus:outline-none',
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
Textarea.displayName = 'Textarea';

export { Textarea };
