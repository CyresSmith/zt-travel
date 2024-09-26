import * as React from 'react';

import { INPUT_STYLES, THEME_TRANSITION } from '@lib/constants';
import { cn } from '@lib/utils';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ className, ...props }, ref) => {
        return (
            <textarea
                className={cn(
                    `${THEME_TRANSITION} ${INPUT_STYLES} flex min-h-[60px] w-full rounded-3xl focus-visible:outline-none`,
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
