import { getLocale } from 'next-intl/server';

import { getLocaleValue } from '@lib/utils';
import { TagType } from '@prisma/client';

import AddNewsForm from '@components/dashboard/add-news';

import { getEventCategories } from '@data/event-categories';
import { getTagsByType } from '@data/tags';

const AddNewsPage = async () => {
    const locale = await getLocale();

    const categories = await getEventCategories().then(data =>
        data?.map(({ id, name }) => ({
            label: getLocaleValue(name, locale),
            value: id,
        }))
    );

    const tags = await getTagsByType(TagType.EVENT).then(data =>
        data?.map(({ id, name }) => ({
            label: getLocaleValue(name, locale),
            value: id,
        }))
    );

    return (
        <div className="flex w-full flex-col gap-10">
            <AddNewsForm categories={categories || []} tags={tags} />
        </div>
    );
};

export default AddNewsPage;
