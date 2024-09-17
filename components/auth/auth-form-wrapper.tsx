import type { ReactNode } from 'react';

import { Button } from '@ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@ui/card';

type Props = {
    title: string;
    buttonLabel: string;
    desc?: string;
    children: ReactNode;
};

const AuthFormWrapper = ({ title, desc, buttonLabel, children }: Props) => {
    return (
        <Card className="mx-auto min-w-[350px]">
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                {desc && <CardDescription>{desc}</CardDescription>}
            </CardHeader>

            <CardContent>{children}</CardContent>

            <CardFooter>
                <Button variant="default" disabled={false} type="submit" className="w-full">
                    {buttonLabel}
                </Button>
            </CardFooter>
        </Card>
    );
};

export default AuthFormWrapper;
