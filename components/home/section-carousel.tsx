import type { ReactNode } from 'react';

import clsx from 'clsx';

import { buttonVariants } from '@ui/button';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@ui/carousel';

import { Link } from '@i18n/routing';

type Props = { items?: ReactNode[]; href?: string; linkLabel?: string };

const SectionCarousel = ({ items = [], href, linkLabel }: Props) => {
    return (
        <Carousel
            opts={{
                loop: true,
                duration: 60,
            }}
        >
            <div className="overflow-hidden rounded-3xl">
                <CarouselContent>
                    {items.map((item, i) => (
                        <CarouselItem key={i} className="basis-1/3">
                            {item}
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </div>

            <div className="mt-5 flex justify-between gap-10">
                {href && linkLabel && (
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
                )}

                <div className="flex gap-5">
                    <CarouselPrevious
                        variant={'yellow'}
                        className="relative left-0 top-0 h-[42px] w-[42px] translate-x-0 translate-y-0"
                    />
                    <CarouselNext
                        variant={'yellow'}
                        className="relative left-0 top-0 h-[42px] w-[42px] translate-x-0 translate-y-0"
                    />
                </div>
            </div>
        </Carousel>
    );
};

export default SectionCarousel;
