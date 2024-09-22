import { useLocale } from 'next-intl';
import type { StaticImageData } from 'next/image';
import Image from 'next/image';

import { Button } from '@ui/button';

import Container from '@components/container';

import { Link } from '@i18n/routing';

type Props = { title: string; desc: string; slug: string; src: StaticImageData };

const Slide = ({ src, desc, slug, title }: Props) => {
    const locale = useLocale();

    return (
        <div className="relative h-screen w-screen">
            {/* <Gradient /> */}
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
                <div className="relative mb-3 mt-auto h-[111px] w-[320px] overflow-hidden text-ellipsis">
                    <h3 className="text-xxl">{title[locale]}</h3>
                    <p className="absolute left-0 top-[39px] max-h-[72px] max-w-[320px] overflow-hidden text-ellipsis">
                        {desc[locale]}
                    </p>
                </div>

                <Button asChild>
                    <Link href={`places/${slug}`}>{locale === 'uk' ? 'Детальніше' : 'More'}</Link>
                </Button>
            </Container>
        </div>
    );
};

export default Slide;
