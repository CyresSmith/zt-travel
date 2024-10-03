import { getTranslations } from 'next-intl/server';

import type { DashboardMenuLinkProps } from './dashboard-menu-link';
import DashboardMenuLink from './dashboard-menu-link';

const links: DashboardMenuLinkProps[] = [
    {
        icon: 'widget',
        label: 'dashboard',
        href: '/dashboard',
    },
    {
        icon: 'point-on-map',
        label: 'addLocation',
        href: '/dashboard/add-location',
    },
    {
        icon: 'bookmark',
        label: 'addEvent',
        href: '/dashboard/add-event',
    },
];

const DashboardMenu = async () => {
    const t = await getTranslations('dashboard.menu');

    return (
        <ul className="flex w-[180px] flex-col gap-1">
            {links.map(link => (
                <DashboardMenuLink key={link.href} {...link} label={t(link.label)} />
            ))}
        </ul>
    );
};

export default DashboardMenu;
