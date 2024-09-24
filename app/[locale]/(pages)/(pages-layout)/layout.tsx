import type { WithChildren } from '@lib/types';

import Container from '@components/container';

export default async function RootLayout({ children }: WithChildren) {
    return <Container className="mt-[84px]">{children}</Container>;
}
