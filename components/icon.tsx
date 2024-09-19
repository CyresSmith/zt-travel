import { type SVGProps } from 'react';

import type { IconName } from '@icon-names';
import { THEME_TRANSITION } from '@lib/constants';
import clsx from 'clsx';

type Props = SVGProps<SVGSVGElement> & {
    name: IconName;
    width?: number;
    height?: number;
};

const Icon = ({ name, width = 22, height = 22, className, ...props }: Props) => {
    return (
        <svg
            {...props}
            width={width}
            height={height}
            fill="inherit"
            className={clsx(className, THEME_TRANSITION)}
        >
            <use href={`/icons/sprite.svg#${name}`} />
        </svg>
    );
};

export default Icon;
