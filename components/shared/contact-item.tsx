import Link from 'next/link';

import { THEME_TRANSITION } from '@lib/constants';
import type { WithChildren } from '@lib/types';
import type { IconName } from '@lib/types/icon-names';
import clsx from 'clsx';

import Icon from '@components/icon';

type Props = { icon: IconName; href?: string; link?: boolean } & WithChildren;

const ContactItem = ({ href = '', icon, link, children }: Props) => {
    const Slot = link ? Link : 'p';

    return (
        <Slot
            href={href}
            rel="noopener noreferrer nofollow"
            target="_blank"
            className={clsx(
                `flex items-center gap-2 fill-white ${THEME_TRANSITION}`,
                link && 'hover:fill-themeYellow hover:text-themeYellow'
            )}
        >
            <Icon name={icon} fill="inherit" />

            {children}
        </Slot>
    );
};

export default ContactItem;
