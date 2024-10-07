import Icon from '@components/icon';

import type { IconName } from '@icon-names';

import { THEME_TRANSITION } from '@constants';

import { Link } from '@i18n/routing';

type Props = { label: string; icon: IconName; href?: string };

const CardLink = ({ label, icon, href = '' }: Props) => {
    const Slot = href ? Link : 'p';

    return (
        <Slot
            {...(href ? { href } : {})}
            className={`${THEME_TRANSITION} flex gap-1 fill-themeSecondary hover:fill-themeGreen hover:text-themeGreen`}
        >
            <Icon name={icon} />

            <span className="fill-secondary-main flex-1 overflow-hidden text-ellipsis text-nowrap">
                {label}
            </span>
        </Slot>
    );
};

export default CardLink;
