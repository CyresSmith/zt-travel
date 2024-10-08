import type { PropsWithChildren } from 'react';

export default async function RootLayout({ children }: PropsWithChildren) {
    return <div className="flex h-full flex-1 flex-col pt-[104px]">{children}</div>;
}
