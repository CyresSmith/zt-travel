import AddLocationForm from '@components/dashboard/add-location/add-location-form';

import { getCommunities } from '@data/community';
import { getDistricts } from '@data/district';
import { getPlaceCategories } from '@data/place-categories';

const AddLocationPage = async () => {
    const categories = await getPlaceCategories().then(data =>
        data?.map(({ id, name_uk }) => ({
            label: name_uk,
            value: id,
        }))
    );

    const communities = await getCommunities().then(data =>
        data?.map(({ id, name_uk, districtId }) => ({
            label: name_uk,
            value: id,
            districtId,
        }))
    );

    const districts = await getDistricts().then(data =>
        data?.map(({ id, name_uk }) => ({
            label: name_uk,
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
