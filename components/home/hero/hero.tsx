'use client';

import Autoplay from 'embla-carousel-autoplay';
import Fade from 'embla-carousel-fade';

import Slide from './slide';

import { Carousel, CarouselContent, CarouselItem } from '@ui/carousel';

import Gradient from '@components/gradient';
import Icon from '@components/icon';

import dom from '@assets/images/domik.jpeg';
import karier from '@assets/images/druzhbivskyy-karier.jpg';

const slides = [
    {
        title: { uk: 'Будинок кохання', en: 'House of love' },
        desc: {
            uk: 'Невеличкий будиночок, що расташовано на острові посеред озера в селі Старий Солотвін',
            en: 'Small house, what located on the island on the middle of lake in Stary Solotvin',
        },
        slug: 'budinok-kohannya',
        src: dom,
    },
    {
        title: { uk: `Дружківський кар'єр`, en: 'Druzhkivsy karier' },
        desc: {
            uk: 'Мальовниче місце в селі Дружківка яке називають "Житомирськими мальдівами"',
            en: 'Beautiful place in Druzhkivka what called "Zhitomir maldives"',
        },
        slug: 'druzhkivsy-karier',
        src: karier,
    },
];

const Hero = () => {
    return (
        <section>
            <div className="relative h-screen w-full">
                <Carousel
                    plugins={[
                        Autoplay({
                            delay: 5000,
                        }),
                        Fade(),
                    ]}
                    opts={{
                        loop: true,
                        duration: 60,
                    }}
                >
                    <CarouselContent>
                        {slides.map(slide => (
                            <CarouselItem key={slide.slug} className="relative basis-full">
                                <Slide {...slide} />
                                <Gradient />
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>

                <Icon
                    name="l-1"
                    width={168}
                    height={124}
                    className="absolute bottom-0 right-0 z-10 animate-patternScaleIn fill-white"
                />
                <Icon
                    name="m-2"
                    width={100}
                    height={100}
                    className="absolute bottom-1/2 right-1/4 z-10 animate-patternScaleIn fill-white"
                />
            </div>
        </section>
    );
};

export default Hero;
