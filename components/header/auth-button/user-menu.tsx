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

import { THEME_TRANSITION } from '@lib/constants';
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
            <DropdownMenuContent className="data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade w-48 rounded-3xl bg-card p-4 text-black will-change-[opacity,transform]">
                <DropdownMenuLabel>{user.name || user.email || 'User'}</DropdownMenuLabel>

                <Separator />

                <DropdownMenuGroup className="flex flex-col gap-1">
                    <MenuLink iconName="settings" href="/settings" name={t('settings')} />
                    <MenuLink iconName="widget" href="/dashboard" name={t('dashboard')} />

                    {user.role === UserRole.ADMIN && (
                        <MenuLink iconName="eye" href="/admin" name="Admin" />
                    )}
                </DropdownMenuGroup>

                <Separator />

                <DropdownMenuItem className={`mt-4 outline-none`}>
                    <Button
                        variant={'purple'}
                        onClick={handleSignOut}
                        className="flex w-full items-center"
                    >
                        <Icon name="logout" className="mr-2" />
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
        className={`rounded-lg px-2 py-1 outline-none data-[highlighted]:bg-accent ${THEME_TRANSITION}`}
    >
        {children}
    </DropdownMenuItem>
);

const Separator = () => <DropdownMenuSeparator className="my-2 border-b-2" />;

type MenuLinkProps = { iconName: IconName; href: string; name: string };

const MenuLink = ({ iconName, href, name }: MenuLinkProps) => (
    <MenuItem asChild>
        <Link href={href} className="flex items-center gap-2">
            <Icon name={iconName} />
            <span className="flex-1 truncate">{name}</span>
        </Link>
    </MenuItem>
);
