'use client';

import type { ComponentPropsWithoutRef, ElementRef } from 'react';
import { forwardRef } from 'react';

import { cn } from '@lib/utils';

import {
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from '@ui/navigation-menu';

import { Link, usePathname } from '@i18n/routing';

type MenuItem = { label: string; href: string };

type Props = { items: MenuItem[] };

const Navigation = ({ items }: Props) => {
    const pathname = usePathname();

    return (
        <NavigationMenuList>
            {items.map(({ label, href }) => (
                <NavigationMenuItem key={label} className="relative h-full">
                    <NavigationMenuLink
                        active={pathname === href}
                        className={navigationMenuTriggerStyle()}
                        asChild
                    >
                        <Link href={href}>{label}</Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>
            ))}
        </NavigationMenuList>
    );
};

export default Navigation;

const ListItem = forwardRef<ElementRef<'a'>, ComponentPropsWithoutRef<'a'>>(
    ({ className, title, children, ...props }, ref) => {
        return (
            <li>
                <NavigationMenuLink asChild>
                    <a
                        ref={ref}
                        className={cn(
                            'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
                            className
                        )}
                        {...props}
                    >
                        <div className="text-sm font-medium leading-none">{title}</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            {children}
                        </p>
                    </a>
                </NavigationMenuLink>
            </li>
        );
    }
);
ListItem.displayName = 'ListItem';
