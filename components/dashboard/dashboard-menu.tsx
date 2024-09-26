import type { DashboardMenuLinkProps } from './dashboard-menu-link';
import DashboardMenuLink from './dashboard-menu-link';

const links: DashboardMenuLinkProps[] = [
    {
        icon: 'widget',
        label: 'Dashboard',
        href: '/dashboard',
    },
    {
        icon: 'point-on-map',
        label: 'Add location',
        href: '/dashboard/add-location',
    },
    {
        icon: 'bookmark',
        label: 'Add event',
        href: '/dashboard/add-event',
    },
];

const DashboardMenu = () => {
    return (
        <ul className="flex w-[180px] flex-col gap-1">
            {links.map(link => (
                <DashboardMenuLink key={link.href} {...link} />
            ))}
        </ul>
    );
};

export default DashboardMenu;
