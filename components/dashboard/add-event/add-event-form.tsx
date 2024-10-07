'use client';

import { useSession } from 'next-auth/react';
import type { ChangeEventHandler } from 'react';
import { useEffect, useState, useTransition } from 'react';
import { useForm, useWatch } from 'react-hook-form';

import { useTranslations } from 'next-intl';

import { zodResolver } from '@hookform/resolvers/zod';
import { AddEventSchema } from '@lib/schemas';
import { hoursToMilliseconds, minutesToMilliseconds } from 'date-fns';
import type { z } from 'zod';

import MainImageLoad from '../main-image-load';

import { Button } from '@ui/button';
import { Form, FormLabel } from '@ui/form';
import { Input } from '@ui/input';

import type { SelectItemType } from '@components/form-input-field';
import FormInputField from '@components/form-input-field';

import { useToast } from '@hooks';

import { ResponseStatus } from '@enums';

import {
    filterUndefinedValues,
    getDateWithTime,
    getFileUri,
    getHoursAndMinutesFromString,
    getSlug,
} from '@utils';

import { useEventAdd, useEventUpdate } from '@data/events/mutations';
import { getEventBySlug } from '@data/events/queries';

import uploadToCloudinary from '@actions/cloudinary/upload-image';

export type AddEventValues = z.infer<typeof AddEventSchema>;

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
    { name: 'url', type: 'text' },
    // { name: 'categoryId', type: 'select' },
    { name: 'tags', type: 'multi' },
    { name: 'start', type: 'date' },
    { name: 'duration', type: 'time' },
    { name: 'periodic', type: 'check' },
];

const requiredInfo = ['phone', 'start', 'duration'];

const defaultValues = {
    nameUk: '',
    nameEn: '',
    descUk: '',
    descEn: '',
    addressUk: '',
    addressEn: '',
    // categoryId: '',
    tags: [],
    email: '',
    phone: '',
    url: '',
    start: new Date(),
    duration: '01:00',
    periodic: false,
    placeId: '',
};

type Props = {
    categories: SelectItemType[];
    tags: SelectItemType[];
};

const AddEventForm = ({ categories, tags }: Props) => {
    const { data: session } = useSession();
    const t = useTranslations('dashboard.addEvent');
    const { toast } = useToast();
    const [fileData, setFileData] = useState<null | { file: File; fileName: string }>(null);
    const [isPending, startTransition] = useTransition();
    const [timeValue, setTimeValue] = useState<string>('12:00');

    const { mutateAsync: addEvent, isError: isEventAddError, error: eventAddError } = useEventAdd();
    const {
        mutateAsync: updateEvent,
        isError: isEventUpdateError,
        error: eventUpdateError,
    } = useEventUpdate();

    const userId = session?.user?.id;

    const form = useForm<AddEventValues>({
        resolver: zodResolver(AddEventSchema),
        defaultValues,
        mode: 'onChange',
        reValidateMode: 'onChange',
        shouldUseNativeValidation: false,
    });

    const start = useWatch({
        control: form.control,
        name: 'start',
    });

    const { isValid, errors } = form.formState;

    const handleTimeChange: ChangeEventHandler<HTMLInputElement> = e => {
        const time = e.target.value;
        form.setValue('start', getDateWithTime(time, start));
        setTimeValue(time);
    };

    const handleSubmit = async (values: AddEventValues) => {
        if (!userId) return;

        const {
            nameEn,
            nameUk,
            addressEn,
            addressUk,
            descEn,
            descUk,
            phone,
            start,
            duration,
            periodic,
            tags: tagsValues,
            ...rest
        } = values;

        const slug = getSlug(nameEn);

        const resetState = () => {
            form.reset();
            setFileData(null);
        };

        startTransition(async () => {
            const slugExist = await getEventBySlug(slug);

            if (slugExist) {
                toast({
                    title: 'Slug already exist',
                    description: 'Slug must be uniq',
                    variant: 'destructive',
                });

                return;
            }

            const [hours, minutes] = getHoursAndMinutesFromString(duration);
            const durationInMs = hoursToMilliseconds(hours) + minutesToMilliseconds(minutes);
            const startDate = getDateWithTime(timeValue, start);

            const tagsData = tagsValues.reduce((acc: string[], { value }) => {
                const exist = tags.find(tag => tag.label === value);
                if (exist) acc.push(exist.value);
                return acc;
            }, []);

            const data = {
                name: { en: nameEn, uk: nameUk },
                address: { en: addressEn, uk: addressUk },
                desc: { en: descEn, uk: descUk },
                phone,
                slug,
                userId,
                start: startDate,
                duration: durationInMs,
                periodic,
                tags: tagsData,
                ...filterUndefinedValues(rest),
            };

            const newEvent = await addEvent(data);

            if (newEvent) {
                const successMessage = 'Event created successfully';

                if (fileData) {
                    const fileUri = await getFileUri(fileData.file);

                    const { status, url } = await uploadToCloudinary({
                        fileUri,
                        fileName: fileData.fileName,
                        folder: `event_${slug}`,
                    });

                    if (status === ResponseStatus.ERROR) {
                        toast({
                            title: String(status),
                            description: 'Event created, but image load failed!',
                        });
                    }

                    if (url) {
                        const data = { image: url };

                        const event = await updateEvent({
                            id: newEvent.id,
                            data,
                        });

                        if (event) {
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
        if (!isEventAddError) return;

        toast({
            title: 'Error',
            description: eventAddError.message || 'Event creation error',
            variant: 'destructive',
        });
    }, [eventAddError, isEventAddError, toast]);

    useEffect(() => {
        if (!isEventUpdateError) return;

        toast({
            title: 'Error',
            description: eventUpdateError.message || 'Event update error',
            variant: 'destructive',
        });
    }, [eventUpdateError, isEventUpdateError, toast]);

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
                            <FormInputField<AddEventValues>
                                {...item}
                                label={t(item.name)}
                                key={item.name}
                                control={form.control}
                                required
                                disabled={isPending}
                                error={!!errors[item.name as keyof AddEventValues]}
                                name={item.name as keyof AddEventValues}
                            />
                        ))}
                    </div>

                    <div className="grid grid-cols-2 gap-10">
                        {inputsInfo.map(item => {
                            return item.name === 'start' ? (
                                <div className="space-y-2" key={item.name}>
                                    <div>
                                        <FormLabel>{t(item.name)}</FormLabel>
                                        <span className="ml-1 font-bold">*</span>
                                    </div>

                                    <div className="grid grid-cols-2 gap-5">
                                        <Input
                                            disabled={isPending}
                                            type="time"
                                            value={timeValue}
                                            onChange={handleTimeChange}
                                            required
                                        />

                                        <FormInputField<AddEventValues>
                                            {...item}
                                            control={form.control}
                                            disabled={isPending}
                                            error={!!errors[item.name as keyof AddEventValues]}
                                            name={item.name as keyof AddEventValues}
                                            required
                                        />
                                    </div>
                                </div>
                            ) : (
                                <FormInputField<AddEventValues>
                                    {...item}
                                    label={t(item.name)}
                                    key={item.name}
                                    control={form.control}
                                    disabled={isPending}
                                    error={!!errors[item.name as keyof AddEventValues]}
                                    name={item.name as keyof AddEventValues}
                                    required={requiredInfo.includes(item.name)}
                                    {...(item.name === 'categoryId' || item.name === 'tags'
                                        ? {
                                              selectItems:
                                                  item.name === 'categoryId'
                                                      ? categories
                                                      : tags.map(({ label }) => ({
                                                            value: label,
                                                            label,
                                                        })),
                                          }
                                        : {})}
                                />
                            );
                        })}

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

export default AddEventForm;
