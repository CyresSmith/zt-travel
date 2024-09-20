'use client';

import { useState } from 'react';

import { usePathname } from 'next/navigation';

import clsx from 'clsx';

import { Link } from '@i18n/routing';

type Props = {
    slug: string;
    label: string;
};

const HeaderLink = ({ label, slug }: Props) => {
    const [isHovered, setIsHovered] = useState(false);
    const pathname = usePathname();
    const isActive = pathname.includes(slug);

    const toggleHover = () => setIsHovered(p => !p);

    return (
        <div className="relative flex h-full flex-col items-center justify-between">
            <Link
                onMouseEnter={toggleHover}
                onMouseLeave={toggleHover}
                className={clsx(
                    'inline-block h-full content-center',
                    'after:h-1 after:w-full after:rounded-sm',
                    'after:absolute after:bottom-0 after:left-0 after:block',
                    'after:transition-all after:duration-300 after:ease-in-out',
                    isActive
                        ? 'text-secondary-light after:bg-secondary-main hover:text-secondary-main'
                        : 'after:bg-accent-main hover:text-accent-main text-white',
                    isHovered || isActive ? 'after:opacity-100' : 'after:opacity-0'
                )}
                href={slug}
            >
                {label}
            </Link>
        </div>
    );
};

export default HeaderLink;
