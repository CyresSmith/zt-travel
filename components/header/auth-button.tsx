'use client';

import { useState } from 'react';

import { Button } from '@ui/button';

type Props = { label: string };

const AuthButton = ({ label }: Props) => {
    const [modalOpen, setModalOpen] = useState(false);

    return (
        <>
            <Button variant={'ghost'} onClick={() => setModalOpen(true)}>
                {label}
            </Button>
        </>
    );
};

export default AuthButton;
