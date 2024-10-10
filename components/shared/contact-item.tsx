import Link from 'next/link';

import clsx from 'clsx';

import Icon from '@components/icon';

import type { WithChildren } from '@types';

import type { IconName } from '@icon-names';

import { THEME_TRANSITION } from '@constants';

type Props = { icon: IconName; href?: string } & WithChildren;

const ContactItem = ({ href, icon, children }: Props) => {
    const Slot = href ? Link : 'p';

    return (
        <Slot
            href={href || ''}
            rel="noopener noreferrer nofollow"
            target="_blank"
            className={clsx(
                `flex items-start gap-2 fill-white ${THEME_TRANSITION}`,
                href && 'hover:fill-themeYellow hover:text-themeYellow'
            )}
        >
            <Icon name={icon} fill="inherit" />

            {children}
        </Slot>
    );
};

export default ContactItem;
