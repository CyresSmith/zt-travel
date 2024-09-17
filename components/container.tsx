import type { ReactNode } from 'react';

import clsx from 'clsx';

type Props = { className?: string; children: ReactNode };

const Container = ({ className, children }: Props) => {
    return (
        <div
            className={clsx(
                className && className,
                'mx-auto',
                'mobile:py-3 mobile:w-[320px]',
                'tablet:py-4 tablet:w-[768px]',
                'desktop:py-6 desktop:w-[1280px]'
            )}
        >
            {children}
        </div>
    );
};

export default Container;
