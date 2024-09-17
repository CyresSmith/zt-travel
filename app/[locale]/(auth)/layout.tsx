import type { WithChildren, WithLocale } from '@lib/types';

export default async function AuthLayout({
    children,
    params: { locale },
}: WithLocale & WithChildren) {
    return <main className="flex h-screen w-screen items-center justify-center">{children}</main>;
}
