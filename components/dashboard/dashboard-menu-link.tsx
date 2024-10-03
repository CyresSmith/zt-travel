'use client';

import Link from 'next/link';

import { THEME_TRANSITION } from '@lib/constants';
import type { IconName } from '@lib/types/icon-names';
import clsx from 'clsx';

import Icon from '@components/icon';

import { usePathname } from '@i18n/routing';

export type DashboardMenuLinkProps = { icon: IconName; label: string; href: string };

const DashboardMenuLink = ({ icon, label, href }: DashboardMenuLinkProps) => {
    const pathname = usePathname();
    const isActive = pathname === href;

    return (
        <li className="w-full">
            <Link
                className={clsx(
                    'flex w-full items-start gap-2 rounded-full fill-themeBg px-4 py-2',
                    THEME_TRANSITION,
                    isActive && 'bg-themeBg fill-themeFg text-themeFg hover:bg-themeBg/80',
                    !isActive && 'hover:bg-themeSecondary/50'
                )}
                href={href}
            >
                <Icon name={icon} /> <span className="flex-1 truncate">{label}</span>
            </Link>
        </li>
    );
};

export default DashboardMenuLink;
