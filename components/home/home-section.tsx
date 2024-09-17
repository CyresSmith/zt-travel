import type { ReactNode } from 'react';

import Link from 'next/link';

type Props = {
    title: string;
    titleHref: string;
    children: ReactNode;
    isLight?: boolean;
    isFirst?: boolean;
};

const HomeSection = ({ title, titleHref, children, isLight, isFirst }: Props) => {
    return (
        <section>
            <Link href={titleHref}>
                <h2>{title}</h2>
            </Link>

            {children}
        </section>
    );
};

export default HomeSection;
