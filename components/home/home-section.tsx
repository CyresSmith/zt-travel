import type { ReactNode } from 'react';

import clsx from 'clsx';

import Container from '@components/container';

import { namu } from '@fonts';

type Props = {
    title?: string;
    children: ReactNode;
};

const HomeSection = ({ title, children }: Props) => {
    return (
        <section
            className={clsx(
                'relative flex max-h-full flex-1 flex-col bg-gradient-to-b from-transparent via-themePrimary to-transparent pb-10 pt-5'
            )}
        >
            <Container className="flex flex-col">
                {title && (
                    <h2 className={clsx(namu.className, 'mb-10 text-3xl text-themeYellow')}>
                        {title}
                    </h2>
                )}

                {children}
            </Container>
        </section>
    );
};

export default HomeSection;
