import { THEME_TRANSITION } from '@lib/constants';
import type { IconName } from '@lib/types/icon-names';

import Icon from '@components/icon';

import { Link } from '@i18n/routing';

type Props = { label: string; href: string; icon: IconName };

const CardLink = ({ label, href, icon }: Props) => {
    return (
        <Link
            href={href}
            className={`${THEME_TRANSITION} flex gap-1 fill-themeSecondary hover:fill-themeGreen hover:text-themeGreen`}
        >
            <Icon name={icon} />

            <span className="fill-secondary-main flex-1 overflow-hidden text-ellipsis text-nowrap">
                {label}
            </span>
        </Link>
    );
};

export default CardLink;
