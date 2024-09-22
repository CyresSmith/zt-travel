import { getLocale } from 'next-intl/server';
import Image from 'next/image';

import { getLocaleValue } from '@lib/utils';
import clsx from 'clsx';

import Icon from '@components/icon';

import karier from '@assets/images/druzhbivskyy-karier.jpg';

import { Link } from '@i18n/routing';

import type { PlaceBasicInfo } from '@data/places/types';

type Props = { place: PlaceBasicInfo };

const PlaceItem = async ({ place }: Props) => {
    const locale = await getLocale();

    const name = getLocaleValue(place.name, locale);
    const address = getLocaleValue(place.address, locale);

    return (
        <li
            className={clsx(
                'flex h-[400px] flex-col overflow-hidden rounded-3xl bg-white text-black'
            )}
        >
            <Image
                src={karier}
                alt={name}
                placeholder="blur"
                quality={100}
                style={{
                    objectFit: 'cover',
                    height: '50%',
                }}
            />

            <div className="flex flex-1 flex-col justify-between gap-4 p-5">
                <Link href={`places/${place.slug}`}>
                    <h4 className="line-clamp-2 max-h-[66px] w-full overflow-hidden text-ellipsis text-xl font-bold transition-colors duration-300 ease-in-out hover:text-black/50">
                        {name}
                    </h4>
                </Link>

                <div className="flex gap-2">
                    <Icon name="map-point" width={24} height={24} className="fill-secondary-main" />
                    <Link
                        href={place.gmapsUrl || ''}
                        className="overflow-hidden text-ellipsis text-nowrap transition-colors duration-300 ease-in-out hover:text-black/50"
                    >
                        {address}
                    </Link>
                </div>
            </div>
        </li>
    );
};

export default PlaceItem;
