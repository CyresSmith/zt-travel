import type { ReactNode } from 'react';

import clsx from 'clsx';

type Props = { className?: string; children: ReactNode };

const Container = ({ className, children }: Props) => {
    return (
        <div
            className={clsx(
                className && className,
                'mx-auto',
                'mobile:w-[320px] mobile:px-3',
                'tablet:w-[768px] tablet:px-4',
                'desktop:w-[1280px] desktop:px-6'
            )}
        >
            {children}
        </div>
    );
};

export default Container;
