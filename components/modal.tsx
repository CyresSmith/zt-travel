import type { ReactNode } from 'react';

import { Card } from '@ui/card';

type Props = { children: ReactNode };

const Modal = ({ children }: Props) => {
    return (
        <div className="fixed left-0 top-0 z-50 flex h-screen w-screen items-center justify-center bg-backdrop">
            <Card className="min-h-[300px] min-w-[300px] rounded-3xl bg-white">{children}</Card>
        </div>
    );
};

export default Modal;
