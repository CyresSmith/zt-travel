import { getLocale } from 'next-intl/server';

import { TagType } from '@prisma/client';

import AddEventForm from '@components/dashboard/add-event';

import { getLocaleValue } from '@utils';

import { getEventCategories } from '@data/event-categories/queries';
import { getTagsByType } from '@data/tags/queries';

const AddEventPage = async () => {
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
            <AddEventForm categories={categories || []} tags={tags} />
        </div>
    );
};

export default AddEventPage;
