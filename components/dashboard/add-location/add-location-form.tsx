'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState, useTransition } from 'react';
import { useForm, useWatch } from 'react-hook-form';

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

export type AddPlaceValues = z.infer<typeof AddPlaceSchema>;

const inputsWithLang = [
    { name: 'nameUk', label: 'Назва україньською', type: 'text' },
    { name: 'nameEn', label: 'Назва англійською', type: 'text' },
    { name: 'descUk', label: 'Опис україньською', type: 'textarea' },
    { name: 'descEn', label: 'Опис англійською', type: 'textarea' },
    { name: 'addressUk', label: 'Адреса україньською', type: 'address' },
    { name: 'addressEn', label: 'Адреса англійською', type: 'address' },
];

const inputsInfo = [
    { name: 'phone', label: 'Phone', type: 'phone' },
    { name: 'email', label: 'Email', type: 'email' },
    { name: 'facebook', label: 'Facebook', type: 'text' },
    { name: 'instagram', label: 'Instagram', type: 'text' },
    { name: 'url', label: 'Url', type: 'text' },
    { name: 'gmapsUrl', label: 'GmapsUrl', type: 'text' },
    { name: 'latitude', label: 'Latitude', type: 'text' },
    { name: 'longitude', label: 'Longitude', type: 'text' },
];

const inputsSelects = [
    { name: 'districtId', label: 'Район', type: 'select' },
    { name: 'communityId', label: 'Громада', type: 'select' },
    { name: 'categoryId', label: 'Категорія', type: 'select' },
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

    const userId = session?.user?.id;

    const { toast } = useToast();
    const [fileData, setFileData] = useState<null | { file: File; fileName: string }>(null);

    const [isPending, startTransition] = useTransition();

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

        let image: undefined | string = undefined;

        startTransition(async () => {
            const slugExist = await getPlaceBySlug(slug);

            if (slugExist) {
                return toast({
                    title: 'Slug already exist',
                    description: 'Slug must be uniq',
                    variant: 'destructive',
                });
            }

            if (fileData) {
                const fileUri = await getFileUri(fileData.file);

                const { status, message, url } = await uploadToCloudinary({
                    fileUri,
                    fileName: fileData.fileName,
                    folder: `place_${slug}`,
                });

                if (status === ResponseStatus.ERROR) {
                    toast({ title: String(status), description: message });
                }

                if (url) {
                    image = url;
                }
            }

            let data = {
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

            if (image) {
                data = Object.assign(data, { image });
            }

            const { status, message } = await addPlace(data);

            if (status === ResponseStatus.ERROR) {
                toast({
                    title: 'Error acquired!',
                    description: message,
                    variant: 'destructive',
                });
            }

            if (status === ResponseStatus.SUCCESS) {
                toast({
                    title: 'Success',
                    description: message,
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
            <LocationHeaderPreview setFileData={setFileData} isPending={isPending} />

            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col gap-10">
                    <div className="grid grid-cols-2 gap-10">
                        {inputsWithLang.map(item => (
                            <FormInputField<AddPlaceValues>
                                {...item}
                                key={item.label}
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
                                key={item.label}
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
                                key={item.label}
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
                                Submit
                            </Button>
                        </div>
                    </div>
                </form>
            </Form>
        </div>
    );
};

export default AddLocationForm;
