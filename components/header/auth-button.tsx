'use client';

import { useState } from 'react';

import { Button } from '@ui/button';

import { Link } from '@i18n/routing';

type Props = { label: string };

const AuthButton = ({ label }: Props) => {
    const [modalOpen, setModalOpen] = useState(false);

    return (
        <>
            <Button variant={'ghost'} onClick={() => setModalOpen(true)}>
                <Link href={'/sign-in'}>{label}</Link>
            </Button>
        </>
    );
};

export default AuthButton;
