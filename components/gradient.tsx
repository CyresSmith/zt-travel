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
};

const Gradient = ({ h, top = false }: Props) => {
    return (
        <div
            className={clsx(
                'absolute left-0 z-10 w-full from-primary-dark to-transparent',
                h ? heightClasses[h as HeightType] : 'h-1/2',
                top ? 'top-0 bg-gradient-to-b' : 'bottom-0 bg-gradient-to-t'
            )}
        />
    );
};

export default Gradient;
