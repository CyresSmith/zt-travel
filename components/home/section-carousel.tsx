import type { ReactNode } from 'react';

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@ui/carousel';

type Props = { items?: ReactNode[] };

const SectionCarousel = ({ items = [] }: Props) => {
    return (
        <Carousel
            opts={{
                loop: true,
                duration: 60,
            }}
        >
            <CarouselContent>
                {items.map((item, i) => (
                    <CarouselItem key={i} className="basis-1/3">
                        {item}
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious variant={'yellow'} />
            <CarouselNext variant={'yellow'} />
        </Carousel>
    );
};

export default SectionCarousel;
