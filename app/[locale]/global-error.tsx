'use client';

import Button from '@ui/button';
import Container from '@ui/container';

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return (
        <html>
            <body>
                <Container className="flex h-screen w-screen flex-col content-center justify-center text-center">
                    <Container className="flex h-screen w-screen flex-col content-center justify-center text-center">
                        <h2 className="text-xxl text-red-500">Something went wrong!</h2>
                        <p className="mt-6 text-xl">{error.message}</p>
                        <Button label="Try again" onClick={reset} />
                    </Container>
                </Container>
            </body>
        </html>
    );
}
