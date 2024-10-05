'use client';

import { useCallback, useEffect, useState } from 'react';

import { useSearchParams } from 'next/navigation';

import { newVerification } from 'actions/new-verification';

import { Button } from '../ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card';

import { Link } from '@i18n/routing';

const NewVerificationForm = () => {
    const [error, setError] = useState<string | undefined>(undefined);
    const [success, setSuccess] = useState<string | undefined>(undefined);

    const searchParams = useSearchParams();
    const token = searchParams.get('token');

    const onSubmit = useCallback(() => {
        if (!token) {
            return setError('Missing token!');
        }

        newVerification(token)
            .then(data => {
                setError(data.error);
                setSuccess(data.success);
            })
            .catch(() => setError('Something went wrong'));
    }, [token]);

    useEffect(() => {
        onSubmit();
    }, [onSubmit]);

    return (
        <Card className="flex w-[350px] flex-col items-center">
            <CardHeader>
                <h1 className="text-2xl">Verification</h1>
            </CardHeader>

            <CardContent>
                <p className="mb-8 text-xl">Confirming Your verification!</p>

                {(!error || !success) && <div>Loading...</div>}

                {error && <p className="text-destructive space-y-4 text-center">{error}</p>}

                {success && <p className="space-y-4 text-center text-emerald-400">{success}</p>}
            </CardContent>

            <CardFooter>
                <Button variant={'outline'} asChild>
                    <Link href="/sign-in">Return to login</Link>
                </Button>
            </CardFooter>
        </Card>
    );
};

export default NewVerificationForm;
