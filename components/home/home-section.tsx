import type { ReactNode } from 'react';

import clsx from 'clsx';

import { buttonVariants } from '@ui/button';

import Container from '@components/container';

import { namu } from '@fonts';

import { Link } from '@i18n/routing';

type Props = {
    title?: string;
    children: ReactNode;
    href?: string;
    linkLabel?: string;
};

const HomeSection = ({ title, children, href, linkLabel }: Props) => {
    return (
        <section
            className={clsx(
                'relative flex max-h-full flex-1 flex-col bg-gradient-to-b from-transparent via-themePrimary to-transparent py-5'
            )}
        >
            <Container className="flex flex-col">
                {title && (
                    <h2 className={clsx(namu.className, 'mb-10 text-3xl text-themeBg')}>{title}</h2>
                )}

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
