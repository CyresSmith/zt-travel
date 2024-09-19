'use client';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu';
import { signOut } from 'next-auth/react';

import type { User } from 'next-auth';
import Image from 'next/image';

import { UserRole } from '@prisma/client';

import { Button } from '@ui/button';

import Icon from '@components/icon';

import { Link } from '@i18n/routing';

type Props = { user?: User };

const AuthButton = ({ user }: Props) => {
    return user ? (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button size="icon" className="size-[60px] flex-none rounded-full">
                    {user.image ? (
                        <Image
                            src={user.image}
                            alt={user.name || 'user image'}
                            fill
                            className="aspect-square rounded-full bg-background object-cover"
                        />
                    ) : (
                        <Icon name="user-circle" className="size-full fill-stone-500" />
                    )}
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>{user.name || 'User'}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem asChild>
                        <Link href="/settings">
                            <Icon name="calendar-add" className="mr-2 h-4 w-4" />
                            <span>Settings</span>
                        </Link>
                    </DropdownMenuItem>

                    {user.role === UserRole.ADMIN && (
                        <DropdownMenuItem asChild>
                            <Link href="/admin">
                                <Icon name="eye" className="mr-2 h-4 w-4" />
                                Admin
                            </Link>
                        </DropdownMenuItem>
                    )}
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                    <button
                        onClick={() => signOut({ callbackUrl: '/' })}
                        className="flex w-full items-center"
                    >
                        <Icon name="logout" className="mr-2 h-4 w-4" /> Sign Out
                    </button>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    ) : (
        <Button variant={'link'} size={'icon'} asChild>
            <Link href={'/sign-in'}>
                <Icon name="login" className="fill-white hover:fill-themeYellow" />
            </Link>
        </Button>
    );
};

export default AuthButton;
