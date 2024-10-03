import { getLocale } from 'next-intl/server';

import { getLocaleValue } from '@lib/utils';

import AddLocationForm from '@components/dashboard/add-location';

import { getCommunities } from '@data/community';
import { getDistricts } from '@data/district';
import { getPlaceCategories } from '@data/place-categories';

const AddLocationPage = async () => {
    const locale = await getLocale();

    const categories = await getPlaceCategories().then(data =>
        data?.map(({ id, name }) => ({
            label: getLocaleValue(name, locale),
            value: id,
        }))
    );

    const communities = await getCommunities().then(data =>
        data?.map(({ id, name_uk, name_en, districtId }) => ({
            label: (locale === 'uk' ? name_uk : name_en) || name_uk,
            value: id,
            districtId,
        }))
    );

    const districts = await getDistricts().then(data =>
        data?.map(({ id, name_uk, name_en = '' }) => ({
            label: (locale === 'uk' ? name_uk : name_en) || name_uk,
            value: id,
        }))
    );

    return (
        <div className="flex w-full flex-col gap-10">
            <AddLocationForm
                categories={categories || []}
                communities={communities || []}
                districts={districts || []}
            />
        </div>
    );
};

export default AddLocationPage;
