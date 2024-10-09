// import { QueryClient } from '@tanstack/react-query';
// import { cache } from 'react';
// const getQueryClient = cache(() => new QueryClient()) as () => QueryClient;
// export default getQueryClient;
import { QueryClient, defaultShouldDehydrateQuery, isServer } from '@tanstack/react-query';

import { DEFAULT_STALE_TIME } from '@constants';

function makeQueryClient() {
    return new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: DEFAULT_STALE_TIME,
            },
            dehydrate: {
                shouldDehydrateQuery: query =>
                    defaultShouldDehydrateQuery(query) || query.state.status === 'pending',
            },
        },
    });
}

let browserQueryClient: QueryClient | undefined = undefined;

export default function getQueryClient() {
    if (isServer) {
        return makeQueryClient();
    } else {
        if (!browserQueryClient) browserQueryClient = makeQueryClient();
        return browserQueryClient;
    }
}
