import { type SVGProps } from 'react';

import type { IconName } from '@icon-names';

type Props = SVGProps<SVGSVGElement> & {
    name: IconName;
    width?: number;
    height?: number;
};

const Icon = ({ name, width = 24, height = 24, ...props }: Props) => {
    return (
        <svg {...props} width={width} height={height} fill="inherit">
            <use href={`/icons/sprite.svg#${name}`} />
        </svg>
    );
};

export default Icon;
