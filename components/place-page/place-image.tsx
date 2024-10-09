import { AspectRatio } from '@radix-ui/react-aspect-ratio';
import type { ReactNode } from 'react';

import Image from 'next/image';

import clsx from 'clsx';

import Icon from '@components/icon';

import { THEME_TRANSITION } from '@constants';

type Props = {
    src?: string | null;
    alt?: string;
    isPending?: boolean;
    children?: ReactNode;
};

const PlaceImage = ({ src, alt, isPending = false, children }: Props) => {
    return (
        <AspectRatio
            ratio={16 / 9}
            className={clsx(
                `relative flex w-full items-center justify-center overflow-hidden rounded-3xl bg-themeSecondary fill-themePrimary text-themePrimary hover:fill-themeFg hover:text-themeFg ${THEME_TRANSITION}`,
                children && 'cursor-pointer'
            )}
        >
            {src ? (
                <Image src={src} fill alt={alt || 'Some image'} style={{ objectFit: 'cover' }} />
            ) : (
                <div className="flex flex-col items-center gap-5">
                    <Icon
                        name={isPending ? 'black-hole' : 'image'}
                        width={100}
                        height={100}
                        className={clsx(isPending && 'animate-spin')}
                    />

                    {children && children}
                </div>
            )}
        </AspectRatio>
    );
};

export default PlaceImage;
