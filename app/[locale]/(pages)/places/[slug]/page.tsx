import { getLocale } from 'next-intl/server';

import Container from '@components/container';

import { LocaleType } from '@i18n/routing';

import { getPlaceBySlug } from '@data/places/places';

type Props = {
    params: {
        slug: string;
    };
};

const Place = async ({ params: { slug } }: Props) => {
    const locale = (await getLocale()) as LocaleType;
    const place = await getPlaceBySlug({ slug, locale });

    const name = place?.placeText[0].name;

    return <Container>{name}</Container>;
};

export default Place;
