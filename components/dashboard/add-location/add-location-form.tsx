'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState, useTransition } from 'react';
import { useForm, useWatch } from 'react-hook-form';

import { useLocale, useTranslations } from 'next-intl';

import { zodResolver } from '@hookform/resolvers/zod';
import { ResponseStatus } from '@lib/enums';
import { useToast } from '@lib/hooks/use-toast';
import { AddPlaceSchema } from '@lib/schemas';
import { filterUndefinedValues, getFileUri, getLocaleValue, getSlug } from '@lib/utils';
import type { z } from 'zod';

import MainImageLoad from '../main-image-load';

import { Button } from '@ui/button';
import { Form } from '@ui/form';

import FormInputField from '@components/form-input-field';

import { useCommunities } from '@data/community/queries';
import { useDistricts } from '@data/district/queries';
import { usePlaceCategories } from '@data/place-categories/queries';
import { usePlaceAdd, usePlaceUpdate } from '@data/places/mutations';
import { getPlaceBySlug } from '@data/places/queries';

import uploadToCloudinary from '@actions/cloudinary/upload-image';

export type AddPlaceValues = z.infer<typeof AddPlaceSchema>;

const inputsWithLang = [
    { name: 'nameUk', type: 'text' },
    { name: 'nameEn', type: 'text' },
    { name: 'descUk', type: 'textarea' },
    { name: 'descEn', type: 'textarea' },
    { name: 'addressUk', type: 'address' },
    { name: 'addressEn', type: 'address' },
];

const inputsInfo = [
    { name: 'phone', type: 'phone' },
    { name: 'email', type: 'email' },
    { name: 'facebook', type: 'text' },
    { name: 'instagram', type: 'text' },
    { name: 'url', type: 'text' },
    { name: 'gmapsUrl', type: 'text' },
    { name: 'latitude', type: 'text' },
    { name: 'longitude', type: 'text' },
];

const inputsSelects = [
    { name: 'districtId', type: 'select' },
    { name: 'communityId', type: 'select' },
    { name: 'categoryId', type: 'select' },
];

const defaultValues: AddPlaceValues = {
    nameUk: '',
    nameEn: '',
    descUk: '',
    descEn: '',
    addressUk: '',
    addressEn: '',
    categoryId: '',
    districtId: '',
    communityId: '',
    email: '',
    phone: '',
    url: '',
    facebook: '',
    instagram: '',
    gmapsUrl: '',
    latitude: '',
    longitude: '',
};

const AddLocationForm = () => {
    const locale = useLocale();
    const { data: session } = useSession();
    console.log('🚀 ~ AddLocationForm ~ session:', session);
    const t = useTranslations('dashboard.addLocation');
    const { toast } = useToast();
    const [fileData, setFileData] = useState<null | { file: File; fileName: string }>(null);
    const [isPending, startTransition] = useTransition();

    const { mutateAsync: addPlace, isError, error } = usePlaceAdd();
    const { mutateAsync: updatePlace } = usePlaceUpdate();

    const { data: categoriesData } = usePlaceCategories();

    const categories =
        categoriesData?.map(({ name, id }) => ({
            label: getLocaleValue(name, locale),
            value: id,
        })) || [];

    const { data: districtsData } = useDistricts();

    const districts =
        districtsData?.map(({ id, name_uk, name_en = '' }) => ({
            label: (locale === 'uk' ? name_uk : name_en) || name_uk,
            value: id,
        })) || [];

    const { data: communitiesData } = useCommunities();

    const communities =
        communitiesData?.map(({ id, name_uk, name_en = '', districtId }) => ({
            label: (locale === 'uk' ? name_uk : name_en) || name_uk,
            value: id,
            districtId,
        })) || [];

    const userId = session?.user?.id;

    const form = useForm<AddPlaceValues>({
        resolver: zodResolver(AddPlaceSchema),
        defaultValues,
        mode: 'onChange',
        reValidateMode: 'onChange',
        shouldUseNativeValidation: false,
    });

    const districtIdState = useWatch({
        control: form.control,
        name: 'districtId',
    });

    const communitiesForSelect =
        communities
            ?.filter(({ districtId }) => districtId === districtIdState)
            .map(({ label, value }) => ({ label, value })) || [];

    const { isValid, errors } = form.formState;

    const getSelectItemTypes = (name: string) => {
        switch (name) {
            case 'categoryId':
                return categories;

            case 'districtId':
                return districts;

            default:
                return undefined;
        }
    };

    const resetState = () => {
        form.reset();
        setFileData(null);
    };

    const handleSubmit = async (values: AddPlaceValues) => {
        console.log('🚀 ~ handleSubmit ~ values:', values);
        console.log('🚀 ~ handleSubmit ~ userId:', userId);
        if (!userId) return;

        const {
            nameEn,
            nameUk,
            addressEn,
            addressUk,
            descEn,
            descUk,
            categoryId,
            districtId,
            communityId,
            phone,
            ...rest
        } = values;

        const slug = getSlug(nameEn);

        startTransition(async () => {
            const slugExist = await getPlaceBySlug(slug);

            if (slugExist) {
                toast({
                    title: 'Slug already exist',
                    description: 'Slug must be uniq',
                    variant: 'destructive',
                });

                return;
            }

            const data = {
                name: { en: nameEn, uk: nameUk },
                address: { en: addressEn, uk: addressUk },
                desc: { en: descEn, uk: descUk },
                categoryId,
                districtId,
                communityId,
                phone,
                slug,
                userId,
                ...filterUndefinedValues(rest),
            };

            const place = await addPlace(data);

            if (place) {
                const successMessage = 'Place created successfully';

                if (fileData) {
                    const fileUri = await getFileUri(fileData.file);

                    const { status, url } = await uploadToCloudinary({
                        fileUri,
                        fileName: fileData.fileName,
                        folder: `place_${slug}`,
                    });

                    if (status === ResponseStatus.ERROR) {
                        toast({
                            title: String(status),
                            description: 'Place created, but image load failed!',
                            variant: 'destructive',
                        });

                        return;
                    }

                    if (url) {
                        const data = { image: url };

                        const updatedPlace = await updatePlace({
                            id: place.id,
                            data,
                        });

                        if (updatedPlace) {
                            toast({
                                title: 'Success',
                                description: successMessage,
                                variant: 'success',
                            });

                            resetState();
                        }

                        return;
                    }
                }

                resetState();

                toast({
                    title: 'Success',
                    description: successMessage,
                    variant: 'success',
                });
            }
        });
    };

    useEffect(() => {
        if (!districtIdState) return;
        form.trigger('districtId');
    }, [districtIdState]);

    useEffect(() => {
        if (!isError) {
            return;
        }

        toast({
            title: 'Error',
            description: error.message,
            variant: 'destructive',
        });

        console.error(error.message);
    }, [isError]);

    return (
        <div>
            <MainImageLoad
                isFileData={!!fileData}
                setFileData={setFileData}
                isPending={isPending}
                title={t('addImage')}
            />

            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col gap-10">
                    <div className="grid grid-cols-2 gap-10">
                        {inputsWithLang.map(item => (
                            <FormInputField<AddPlaceValues>
                                {...item}
                                label={t(item.name)}
                                key={item.name}
                                control={form.control}
                                required
                                disabled={
                                    (item.name === 'communityId' && !districtIdState) || isPending
                                }
                                error={!!errors[item.name as keyof AddPlaceValues]}
                                name={item.name as keyof AddPlaceValues}
                                selectItems={
                                    item.name === 'communityId'
                                        ? communitiesForSelect
                                        : getSelectItemTypes(item.name)
                                }
                            />
                        ))}
                    </div>

                    <div className="grid grid-cols-2 gap-10">
                        {inputsInfo.map(item => (
                            <FormInputField<AddPlaceValues>
                                {...item}
                                label={t(item.name)}
                                key={item.name}
                                control={form.control}
                                disabled={
                                    (item.name === 'communityId' && !districtIdState) || isPending
                                }
                                error={!!errors[item.name as keyof AddPlaceValues]}
                                name={item.name as keyof AddPlaceValues}
                                selectItems={
                                    item.name === 'communityId'
                                        ? communitiesForSelect
                                        : getSelectItemTypes(item.name)
                                }
                            />
                        ))}
                    </div>

                    <div className="grid grid-cols-2 gap-10">
                        {inputsSelects.map(item => (
                            <FormInputField<AddPlaceValues>
                                {...item}
                                label={t(item.name)}
                                key={item.name}
                                control={form.control}
                                required
                                disabled={
                                    (item.name === 'communityId' && !districtIdState) || isPending
                                }
                                error={!!errors[item.name as keyof AddPlaceValues]}
                                name={item.name as keyof AddPlaceValues}
                                selectItems={
                                    item.name === 'communityId'
                                        ? communitiesForSelect
                                        : getSelectItemTypes(item.name)
                                }
                            />
                        ))}

                        <div className="flex items-end">
                            <Button
                                type="submit"
                                variant="yellow"
                                disabled={!isValid || isPending}
                                className="w-full"
                            >
                                {t('submit')}
                            </Button>
                        </div>
                    </div>
                </form>
            </Form>
        </div>
    );
};

export default AddLocationForm;
