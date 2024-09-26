import type { DropdownMenuItemProps } from '@radix-ui/react-dropdown-menu';
import {
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
} from '@radix-ui/react-dropdown-menu';
import { signOut } from 'next-auth/react';

import type { User } from 'next-auth';
import { useTranslations } from 'next-intl';

import { THEME_BORDER, THEME_TRANSITION } from '@lib/constants';
import type { WithChildren } from '@lib/types';
import type { IconName } from '@lib/types/icon-names';
import { UserRole } from '@prisma/client';

import { Button } from '@ui/button';

import Icon from '@components/icon';

import { Link } from '@i18n/routing';

type Props = { user: User };

const UserMenu = ({ user }: Props) => {
    const handleSignOut = () => signOut({ callbackUrl: '/' });

    const t = useTranslations('header.user-menu');

    return (
        <DropdownMenuPortal>
            <DropdownMenuContent
                sideOffset={12}
                className={`${THEME_BORDER} z-50 w-48 rounded-3xl bg-themeBg p-3 text-themeFg shadow-main will-change-[opacity,transform] data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade data-[side=right]:animate-slideLeftAndFade data-[side=top]:animate-slideDownAndFade`}
            >
                <DropdownMenuLabel className="truncate font-bold">
                    {user.name || user.email || 'User'}
                </DropdownMenuLabel>

                <Separator />

                <DropdownMenuGroup className="flex flex-col gap-1">
                    {user.role === UserRole.ADMIN && (
                        <MenuLink iconName="widget" href="/dashboard" name={t('dashboard')} />
                    )}

                    <MenuLink iconName="settings" href="/settings" name={t('settings')} />
                </DropdownMenuGroup>

                <Separator />

                <DropdownMenuItem className={`mt-4 outline-none`}>
                    <Button
                        variant={'default'}
                        onClick={handleSignOut}
                        className="flex w-full items-center"
                        iconName="logout"
                    >
                        {t('sign-out')}
                    </Button>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenuPortal>
    );
};

export default UserMenu;

const MenuItem = ({ children, ...props }: WithChildren & DropdownMenuItemProps) => (
    <DropdownMenuItem
        {...props}
        className={`rounded-full fill-themeFg px-4 py-2 outline-none data-[highlighted]:bg-themePrimary/20 ${THEME_TRANSITION}`}
    >
        {children}
    </DropdownMenuItem>
);

const Separator = () => (
    <DropdownMenuSeparator className="my-2 rounded-full border-b-[1px] border-themeSecondary/20" />
);

type MenuLinkProps = { iconName: IconName; href: string; name: string };

const MenuLink = ({ iconName, href, name }: MenuLinkProps) => (
    <MenuItem asChild>
        <Link href={href} className="flex items-center gap-2">
            <Icon name={iconName} />
            <span className="flex-1 truncate">{name}</span>
        </Link>
    </MenuItem>
);
