import clsx from 'clsx';

const heightClasses = {
    50: 'h-[50px]',
    100: 'h-[100px]',
    200: 'h-[200px]',
};

type HeightType = keyof typeof heightClasses;

type Props = {
    top?: boolean;
    h?: HeightType;
    className?: string;
    light?: boolean;
};

const Gradient = ({ h, top = false, className, light = false }: Props) => {
    return (
        <div
            className={clsx(
                'pointer-events-none absolute left-0 z-0 w-full from-themeFg to-transparent',
                h ? heightClasses[h] : 'h-1/2',
                top ? 'top-0 bg-gradient-to-b' : 'bottom-0 bg-gradient-to-t',
                light ? 'from-themePrimary to-transparent' : 'from-themeFg to-transparent',
                className && className
            )}
        />
    );
};

export default Gradient;
