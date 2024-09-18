import type { WithChildren, WithLocale } from '@lib/types';

import Header from '@components/header';

export default async function RootLayout({
    children,
    params: { locale },
}: WithChildren & WithLocale) {
    return (
        <>
            <Header params={{ locale }} />
            <main>{children}</main>
        </>
    );
}
