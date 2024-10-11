import { HydrationBoundary, dehydrate } from '@tanstack/react-query';

import { TagType } from '@prisma/client';

import AddNewsForm from '@components/dashboard/add-news';

import { QUERY_KEYS } from '@keys';

import getQueryClient from '@utils/get-query-client';

import getTagsByType from '@actions/tags/get-tag-by-type';

const AddNewsPage = async () => {
    const queryClient = getQueryClient();

    await queryClient.prefetchQuery({
        queryKey: [QUERY_KEYS.ARTICLE_TAGS],
        queryFn: async () => await getTagsByType(TagType.ARTICLE),
    });

    const dehydratedState = dehydrate(queryClient);

    return (
        <HydrationBoundary state={dehydratedState}>
            <div className="flex w-full flex-col gap-10">
                <AddNewsForm />
            </div>
        </HydrationBoundary>
    );
};

export default AddNewsPage;
