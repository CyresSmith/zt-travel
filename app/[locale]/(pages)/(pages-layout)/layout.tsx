import type { WithChildren } from '@lib/types';

export default async function RootLayout({ children }: WithChildren) {
    return <div className="pt-[104px]">{children}</div>;
}
