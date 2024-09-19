import type { ReactNode } from 'react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@ui/card';

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
        </Card>
    );
};

export default AuthFormWrapper;
