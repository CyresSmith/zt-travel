import type { WithChildren, WithLocale } from '@lib/types';

import Header from '@components/header';

export default async function RootLayout({
    children,
    params: { locale },
}: WithChildren & WithLocale) {
    return (
        <main>
            <Header params={{ locale }} />
            {children}
        </main>
    );
}
