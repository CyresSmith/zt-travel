import type { PropsWithChildren } from 'react';

import clsx from 'clsx';

import Container from '@components/container';

const AboutPageSection = ({ children }: PropsWithChildren) => {
    return (
        <section
            className={clsx(
                'relative flex max-h-full flex-1 flex-col bg-gradient-to-b from-transparent via-themePrimary to-transparent pb-10 pt-5'
            )}
        >
            <Container>{children}</Container>
        </section>
    );
};

export default AboutPageSection;
