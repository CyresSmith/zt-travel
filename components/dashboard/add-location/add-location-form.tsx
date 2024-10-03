'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState, useTransition } from 'react';
import { useForm, useWatch } from 'react-hook-form';

import { useTranslations } from 'next-intl';

import { zodResolver } from '@hookform/resolvers/zod';
import { ResponseStatus } from '@lib/enums';
import { useToast } from '@lib/hooks/use-toast';
import { AddPlaceSchema } from '@lib/schemas';
import { getFileUri } from '@lib/utils';
import type { z } from 'zod';

import LocationHeaderPreview from './location-header-preview';

import { Button } from '@ui/button';
import { Form } from '@ui/form';

import type { SelectItemType } from '@components/form-input-field';
import FormInputField from '@components/form-input-field';

import { getPlaceBySlug } from '@data/places';

import uploadToCloudinary from '@actions/cloudinary/upload-image';
import addPlace from '@actions/places/add-place';
import updatePlace from '@actions/places/update-place';

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

type CommunityType = SelectItemType & { districtId: string };

type Props = {
    categories: SelectItemType[];
    districts: SelectItemType[];
    communities: CommunityType[];
};

const AddLocationForm = ({ categories, districts, communities }: Props) => {
    const { data: session } = useSession();
    const t = useTranslations('dashboard.addLocation');
    const { toast } = useToast();
    const [fileData, setFileData] = useState<null | { file: File; fileName: string }>(null);
    const [isPending, startTransition] = useTransition();

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

    const communitiesForSelect = communities
        .filter(({ districtId }) => districtId === districtIdState)
        .map(({ label, value }) => ({ label, value }));

    const handleSubmit = async (values: AddPlaceValues) => {
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

        const restValues = Object.entries(rest).reduce(
            (acc: Record<string, string>, [key, value]) => {
                if (value) acc[key] = value;
                return acc;
            },
            {}
        );

        const slug = nameEn.split(' ').join('-').toLowerCase();

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
                ...restValues,
            };

            const { status, message, data: place } = await addPlace(data);

            if (status === ResponseStatus.ERROR) {
                toast({
                    title: 'Error acquired!',
                    description: message,
                    variant: 'destructive',
                });
            }

            if (status === ResponseStatus.SUCCESS && place) {
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
                        });
                    }

                    if (url) {
                        const data = { image: url };

                        const { status } = await updatePlace({
                            id: (place as { id: string }).id,
                            data,
                        });

                        if (status === ResponseStatus.SUCCESS) {
                            toast({
                                title: 'Success',
                                description: successMessage,
                                variant: 'success',
                            });
                        }

                        if (status === ResponseStatus.ERROR) {
                            toast({
                                title: 'Failed',
                                description: 'Place update failed',
                                variant: 'destructive',
                            });
                        }
                        return;
                    }
                }

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

    return (
        <div>
            <LocationHeaderPreview
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
