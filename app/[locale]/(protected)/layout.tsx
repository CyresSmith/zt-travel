import type { WithChildren, WithLocaleParam } from '@lib/types';

import PagesLayout from '@components/pages-layout';

export default async function Layout({ children, params }: WithChildren & WithLocaleParam) {
    return <PagesLayout params={params}>{children}</PagesLayout>;
}
