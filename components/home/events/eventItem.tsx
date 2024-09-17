import Image from 'next/image';
import Link from 'next/link';

import clsx from 'clsx';

import Icon from '@components/icon';

import karier from '@assets/images/druzhbivskyy-karier.jpg';

type Props = {};

const EventItem = ({}: Props) => {
    const eventDate = new Date(Date.now()).toLocaleString();

    return (
        <li
            className={clsx(
                'bg-primary-dark flex h-[400px] flex-col overflow-hidden rounded-3xl text-white'
            )}
        >
            <div className="relative h-1/2 w-full">
                <Image
                    src={karier}
                    alt="some alt"
                    placeholder="blur"
                    quality={100}
                    fill
                    style={{
                        objectFit: 'cover',
                    }}
                />
                <ul className="absolute left-5 top-5 flex flex-col gap-2">
                    <li
                        className={`bg-accent-light text-m text-primary-dark hover:bg-accent-main rounded-2xl px-2 py-1`}
                    >
                        Some tag
                    </li>
                </ul>
            </div>

            <div className="flex flex-1 flex-col justify-between gap-4 p-5">
                <Link href={`events/some-event`}>
                    <h4 className="hover:text-secondary-main line-clamp-2 max-h-[66px] w-full overflow-hidden text-ellipsis text-xl font-bold transition-colors duration-300 ease-in-out">
                        some event title some event title some event title some event title some
                        event title
                    </h4>
                </Link>

                <div className="flex flex-col gap-2">
                    <div className="flex gap-2">
                        <Icon
                            name="calendar-add"
                            width={24}
                            height={24}
                            className="fill-secondary-main"
                        />
                        <span>{eventDate}</span>
                    </div>

                    <div className="flex gap-2">
                        <Icon
                            name="map-point"
                            width={24}
                            height={24}
                            className="fill-secondary-main"
                        />
                        <Link
                            href={'places/some-place'}
                            className="hover:text-secondary-main overflow-hidden text-ellipsis text-nowrap transition-colors duration-300 ease-in-out"
                        >
                            Some place
                        </Link>
                    </div>
                </div>
            </div>
        </li>
    );
};

export default EventItem;
