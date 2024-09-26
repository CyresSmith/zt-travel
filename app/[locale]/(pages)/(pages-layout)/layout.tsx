import type { WithChildren } from '@lib/types';

import Container from '@components/container';

export default async function RootLayout({ children }: WithChildren) {
    return (
        <div className="pt-[84px]">
            <Container className="py-10">{children}</Container>
        </div>
    );
}
