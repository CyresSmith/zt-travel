import type { WithChildren, WithLocaleParam } from '@lib/types';

export default async function AuthLayout({
    children,
    params: { locale },
}: WithLocaleParam & WithChildren) {
    return <main className="flex h-screen w-screen items-center justify-center">{children}</main>;
}
