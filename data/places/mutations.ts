import { useMutation } from '@tanstack/react-query';

import { QUERY_KEYS } from '@lib/keys';
import getQueryClient from '@lib/utils/get-query-client';

import type { PlaceBasicInfo } from './types';

import addPlace from '@actions/places/add-place';
import updatePlace from '@actions/places/update-place';

export const usePlaceAdd = () => {
    const queryClient = getQueryClient();

    return useMutation({
        mutationFn: addPlace,
        onSuccess: data => {
            queryClient.setQueryData([QUERY_KEYS.PLACES], (prev: PlaceBasicInfo[]) =>
                prev ? prev.concat(data) : [data]
            );
        },
    });
};

export const usePlaceUpdate = () => {
    const queryClient = getQueryClient();

    return useMutation({
        mutationFn: updatePlace,
        onSuccess: data => {
            queryClient.setQueryData([QUERY_KEYS.PLACES, { id: data.id }], data);
            queryClient.setQueryData([QUERY_KEYS.PLACES, { slug: data.slug }], data);
            queryClient.setQueryData([QUERY_KEYS.PLACES], (prev: PlaceBasicInfo[]) => {
                const { id, image, rating, slug, gmapsUrl, name, address, desc, category } = data;

                const newPlace = {
                    id,
                    image,
                    rating,
                    slug,
                    gmapsUrl,
                    name,
                    address,
                    desc,
                    category,
                };

                if (prev) {
                    const array = [...prev];

                    const idx = array.findIndex(place => place.id === data.id);

                    if (idx) {
                        array[idx] = newPlace;
                    }

                    return array;
                }

                return [newPlace];
            });
        },
    });
};
