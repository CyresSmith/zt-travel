import { useLocale } from 'next-intl';
import type { StaticImageData } from 'next/image';
import Image from 'next/image';

import type { StringWithLocales } from '@lib/types';

import { buttonVariants } from '@ui/button';

import Container from '@components/container';

import type { LocaleType } from '@i18n/routing';
import { Link } from '@i18n/routing';

type Props = {
    title: StringWithLocales;
    desc: StringWithLocales;
    slug: string;
    src: StaticImageData;
};

const Slide = ({ src, desc, slug, title }: Props) => {
    const locale = useLocale() as LocaleType;

    return (
        <div className="relative h-screen w-screen">
            <Image
                src={src}
                alt={title[locale]}
                placeholder="blur"
                quality={100}
                fill
                style={{
                    objectFit: 'cover',
                }}
            />
            <Container className="relative z-20 flex h-full flex-col items-start pb-9">
                <div className="relative mb-6 mt-auto h-[111px] w-[320px] overflow-hidden text-ellipsis">
                    <h3 className="text-xxl">{title[locale]}</h3>
                    <p className="absolute left-0 top-[45px] max-h-[72px] max-w-[320px] overflow-hidden text-ellipsis">
                        {desc[locale]}
                    </p>
                </div>

                <Link
                    className={buttonVariants({ variant: 'outlineLight' })}
                    href={`places/${slug}`}
                >
                    {locale === 'uk' ? 'Детальніше' : 'More'}
                </Link>
            </Container>
        </div>
    );
};

export default Slide;
