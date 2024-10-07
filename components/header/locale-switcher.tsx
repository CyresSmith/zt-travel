'use client';

import {
    Select,
    SelectContent,
    SelectIcon,
    SelectItem,
    SelectTrigger,
    SelectValue,
    SelectViewport,
} from '@radix-ui/react-select';
import { useState } from 'react';

import { useLocale } from 'next-intl';

import clsx from 'clsx';
import type { LocaleType } from 'i18n/routing';
import { routing, usePathname, useRouter } from 'i18n/routing';

import Icon from '@components/icon';

import type { IconName } from '@icon-names';

import { THEME_TRANSITION } from '@constants';

const SELECT_WIDTH = 'w-[64px]';

const LocaleSwitcher = () => {
    const router = useRouter();
    const pathname = usePathname();
    const currentLocale = useLocale();

    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = () => setIsOpen(p => !p);

    const handleChange = (locale: LocaleType) => {
        setIsOpen(false);
        router.replace(pathname, { locale });
    };

    return (
        <Select
            onOpenChange={toggleOpen}
            open={isOpen}
            onValueChange={handleChange}
            defaultValue={currentLocale}
            value={currentLocale}
        >
            <SelectTrigger
                className={`${SELECT_WIDTH} inline-flex items-center justify-between gap-3 px-2 py-1`}
            >
                <SelectValue aria-label={currentLocale}>
                    <Icon name={currentLocale as IconName} width={24} height={24} />
                </SelectValue>

                <SelectIcon
                    asChild
                    className={clsx(`${THEME_TRANSITION}`, {
                        ['rotate-180']: isOpen,
                        ['rotate-0']: !isOpen,
                    })}
                >
                    <Icon
                        className={clsx(`fill-white ${THEME_TRANSITION}`, {
                            ['rotate-180']: isOpen,
                            ['rotate-0']: !isOpen,
                        })}
                        name="chevron"
                    />
                </SelectIcon>
            </SelectTrigger>

            <SelectContent
                className="overflow-hidden rounded-full border-none outline-none"
                align="start"
                position="popper"
            >
                <SelectViewport className="w-full" asChild>
                    <ul>
                        {routing.locales
                            .filter(l => l !== currentLocale)
                            .map(l => (
                                <SelectItem
                                    asChild
                                    key={l}
                                    data-state={l === currentLocale ? 'checked' : 'unchecked'}
                                    className={`${THEME_TRANSITION} flex cursor-pointer items-center px-2 py-1 leading-none data-[disabled]:pointer-events-none data-[highlighted]:bg-themeBg data-[highlighted]:outline-none`}
                                    value={l}
                                >
                                    <li>
                                        <Icon name={l as IconName} width={24} height={24} />
                                    </li>
                                </SelectItem>
                            ))}
                    </ul>
                </SelectViewport>
            </SelectContent>
        </Select>
    );
};

export default LocaleSwitcher;
