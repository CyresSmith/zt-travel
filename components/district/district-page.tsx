import { getLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';

import clsx from 'clsx';

import AboutPageSection from '@components/about/about-page-section';
import DistrictsMap from '@components/about/regions-section/districts-map';
import Container from '@components/container';
import EventItem from '@components/home/events/eventItem';
import HomeSection from '@components/home/home-section';
import PlaceItem from '@components/home/places/place-item';
import SectionCarousel from '@components/home/section-carousel';

import { namu } from '@fonts';

import {
    berdychivDistrictId,
    korostenDistrictId,
    zhytomyrDistrictId,
    zvyagelDistrictId,
} from '@constants';

import getDistrictBySlug from '@actions/districts/get-district-by-slug';
import getUpcomingEvents from '@actions/events/get-upcoming-events';
import getPlacesList from '@actions/places/get-places';

type Props = { slug: string };

const DistrictPage = async ({ slug }: Props) => {
    const locale = await getLocale();
    const district = await getDistrictBySlug(slug);

    if (!district) notFound();

    const { data: places } = await getPlacesList({
        districtId: district.id,
        pagination: { page: 1, take: 6 },
    });

    const events = await getUpcomingEvents(district.id);

    const { id, name_en, name_uk } = district;

    return (
        <>
            <AboutPageSection>
                <Container className="grid grid-cols-2">
                    <div>
                        <h1
                            className={clsx(
                                namu.className,
                                'mb-10 flex items-center text-5xl',
                                'before:mr-3 before:block before:aspect-square before:h-[48px] before:rounded-sm',
                                id === zvyagelDistrictId && 'text-themeRed before:bg-themeRed',
                                id === zhytomyrDistrictId && 'text-themeGreen before:bg-themeGreen',
                                id === berdychivDistrictId &&
                                    'text-themePurple before:bg-themePurple',
                                id === korostenDistrictId &&
                                    'text-themeYellow before:bg-themeYellow'
                            )}
                        >
                            {locale === 'uk' ? name_uk : name_en}
                        </h1>

                        <p>
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minus dolorum
                            harum labore aliquid nostrum amet ipsam quidem similique commodi
                            voluptatibus ea eaque earum nihil consequuntur, quis veniam quas eos
                            deserunt! Quidem debitis obcaecati similique omnis quia eveniet quo quod
                            et praesentium dignissimos eligendi reiciendis, veniam suscipit
                            consequatur dolor animi. Reprehenderit aliquam eligendi impedit minus
                            omnis ducimus temporibus odit suscipit magnam. Magnam magni consequatur
                            nemo dolore? Tempora iste, quos enim odit, doloribus eum aspernatur sunt
                            earum ex asperiores illum sit cupiditate esse sint? Voluptatem
                            perspiciatis vero facere magnam, tempore nam voluptas? Optio ipsum,
                            excepturi vero dicta sed tempora officia ipsa facilis cum velit
                            architecto cumque nam accusantium ab harum distinctio inventore nostrum
                            quisquam assumenda consequatur officiis magnam. Laborum harum pariatur
                            sunt. Rerum recusandae consequuntur, expedita dolores amet possimus.
                            Maxime doloremque cumque corporis dolore, illum ex odio, fugiat
                            provident esse ut dolorem accusantium tempora voluptatem velit quo eum
                            maiores nam itaque aspernatur?
                        </p>
                    </div>
                    <DistrictsMap activeRegionSlug={slug} />
                </Container>
            </AboutPageSection>

            {places && places.length > 0 && (
                <HomeSection title="interesting places">
                    <SectionCarousel
                        items={places.map(place => (
                            <PlaceItem key={place.id} place={place} />
                        ))}
                    />
                </HomeSection>
            )}

            {events && events.length > 0 && (
                <HomeSection title={'events'}>
                    <SectionCarousel
                        items={events.map((event, i) => (
                            <EventItem key={i} event={event} />
                        ))}
                    />
                </HomeSection>
            )}
        </>
    );
};

export default DistrictPage;
