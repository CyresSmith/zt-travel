import clsx from 'clsx';

import Container from '@components/container';
import HomeSection from '@components/home/home-section';
import SectionCarousel from '@components/home/section-carousel';
import PlaceImage from '@components/place-page/place-image';
import type { SectionCardProps } from '@components/section-card/section-card';
import SectionCard from '@components/section-card/section-card';
import ContactItem from '@components/shared/contact-item';

import { namu } from '@fonts';

import { APP_HOST } from '@config';

import type { IconName } from '@icon-names';

export type InfoItem = { icon: IconName; href?: string; text: string };

export type SimilarItem = {};

type Props = {
    image?: string | null;
    title: string;
    descTitle?: string;
    desc: string;
    info?: InfoItem[];
    similarTitle?: string;
    similarItems?: SectionCardProps[];
    similarPrefix?: 'news' | 'places' | 'events';
};

const SingleItemPage = async ({
    image,
    title,
    descTitle,
    desc,
    info,
    similarTitle,
    similarItems,
    similarPrefix,
}: Props) => {
    return (
        <>
            <Container>
                {image && <PlaceImage src={image} alt={title} />}

                <h1 className={clsx(namu.className, 'mb-5 mt-10 text-4xl text-themeYellow')}>
                    {title}
                </h1>
            </Container>

            {info && info.length > 0 && (
                <HomeSection>
                    <ul className="relative grid max-h-[261px] grid-cols-2 gap-3 rounded-3xl bg-themeSecondary p-6 shadow-main">
                        {info.map(({ icon, text, href }, i) => (
                            <li key={icon + '-' + i}>
                                <ContactItem icon={icon} href={href}>
                                    {text}
                                </ContactItem>
                            </li>
                        ))}
                    </ul>
                </HomeSection>
            )}

            <HomeSection title={descTitle}>
                <p className="relative z-10 text-justify">{desc}</p>
            </HomeSection>

            {similarItems && similarItems.length > 0 && (
                <HomeSection title={similarTitle}>
                    <SectionCarousel
                        items={similarItems.map(item => (
                            <SectionCard
                                key={item.title}
                                {...item}
                                tags={
                                    similarPrefix
                                        ? item.tags?.map(tag => ({
                                              ...tag,
                                              slug: `${APP_HOST}/${similarPrefix}?${similarPrefix === 'places' ? 'category' : 'tags'}=${tag.slug}`,
                                          }))
                                        : []
                                }
                            />
                        ))}
                    />
                </HomeSection>
            )}
        </>
    );
};

export default SingleItemPage;
