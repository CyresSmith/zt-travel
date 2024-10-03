import { getLocale } from 'next-intl/server';

import { getLocaleValue } from '@lib/utils';
import { TagType } from '@prisma/client';

import AddEventForm from '@components/dashboard/add-event/add-event-form';

import { getEventCategories } from '@data/event-categories';
import { getTagsByType } from '@data/tags';

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
