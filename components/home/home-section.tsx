import type { ReactNode } from 'react';

import { namu } from '@lib/fonts';
import clsx from 'clsx';

import { buttonVariants } from '@ui/button';

import Container from '@components/container';
import Gradient from '@components/gradient';

import { Link } from '@i18n/routing';

type Props = {
    title: string;
    children: ReactNode;
    href?: string;
    linkLabel?: string;
    light?: boolean;
};

const HomeSection = ({ title, children, light = false, href, linkLabel }: Props) => {
    return (
        <section className={clsx(light && 'bg-themePrimary', 'relative py-5')}>
            <Gradient light={!light} className="z-0" />
            <Container>
                <h2 className={clsx(namu.className, 'mb-8 text-3xl text-themeBg')}>{title}</h2>

                {children}

                {href && linkLabel && (
                    <div className="mt-10 flex justify-center">
                        <Link
                            href={href}
                            className={clsx(
                                buttonVariants({
                                    variant: 'outlineLight',
                                }),
                                'z-10'
                            )}
                        >
                            {linkLabel}
                        </Link>
                    </div>
                )}
            </Container>
        </section>
    );
};

export default HomeSection;
