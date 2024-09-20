import type { ReactNode } from 'react';

import { namu } from '@lib/fonts';
import clsx from 'clsx';

import Container from '@components/container';

import { Link } from '@i18n/routing';

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
            <Container>
                <Link href={titleHref}>
                    <h2 className={clsx(namu.className, 'text-3xl mb-5')}>{title}</h2>
                </Link>

                {children}
            </Container>
        </section>
    );
};

export default HomeSection;
