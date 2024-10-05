'use client';

import { DropdownMenu, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';

import type { User } from 'next-auth';
import Image from 'next/image';

import UserMenu from './user-menu';

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
                            className="bg-background aspect-square rounded-full object-cover"
                        />
                    ) : (
                        <Icon name="user-circle" className="size-full fill-stone-500" />
                    )}
                </Button>
            </DropdownMenuTrigger>

            <UserMenu user={user} />
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
