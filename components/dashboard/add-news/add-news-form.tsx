'use client';

import { useSession } from 'next-auth/react';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';

import { useTranslations } from 'next-intl';

import { zodResolver } from '@hookform/resolvers/zod';
import { ResponseStatus } from '@lib/enums';
import { useToast } from '@lib/hooks/use-toast';
import { AddArticleSchema } from '@lib/schemas';
import { getFileUri } from '@lib/utils';
import type { z } from 'zod';

import MainImageLoad from '../main-image-load';

import { Button } from '@ui/button';
import { Form } from '@ui/form';

import type { SelectItemType } from '@components/form-input-field';
import FormInputField from '@components/form-input-field';

import { getArticleBySlug } from '@data/articles/queries';

import addArticle from '@actions/articles/add-article';
import updateArticle from '@actions/articles/update-article';
import uploadToCloudinary from '@actions/cloudinary/upload-image';

export type AddArticleValues = z.infer<typeof AddArticleSchema>;

const inputsWithLang = [
    { name: 'nameUk', type: 'text' },
    { name: 'nameEn', type: 'text' },
    { name: 'descUk', type: 'textarea' },
    { name: 'descEn', type: 'textarea' },
    { name: 'textUk', type: 'textarea' },
    { name: 'textEn', type: 'textarea' },
    { name: 'tags', type: 'multi' },
];

const defaultValues = {
    nameUk: '',
    nameEn: '',
    descUk: '',
    descEn: '',
    textUk: '',
    textEn: '',
    tags: [],
};

type Props = {
    tags: SelectItemType[];
};

const AddNewsForm = ({ tags }: Props) => {
    const { data: session } = useSession();
    const t = useTranslations('dashboard.addNews');
    const { toast } = useToast();
    const [fileData, setFileData] = useState<null | { file: File; fileName: string }>(null);
    const [isPending, startTransition] = useTransition();

    const userId = session?.user?.id;

    const form = useForm<AddArticleValues>({
        resolver: zodResolver(AddArticleSchema),
        defaultValues,
        mode: 'onChange',
        reValidateMode: 'onChange',
        shouldUseNativeValidation: false,
    });

    const { isValid, errors } = form.formState;

    const handleSubmit = async (values: AddArticleValues) => {
        if (!userId) return;

        const { nameEn, nameUk, textEn, textUk, descEn, descUk, tags: tagsValues } = values;

        const slug = nameEn.split(' ').join('-').toLowerCase();

        const resetState = () => {
            form.reset();
            setFileData(null);
        };

        startTransition(async () => {
            const slugExist = await getArticleBySlug(slug);

            if (slugExist) {
                toast({
                    title: 'Slug already exist',
                    description: 'Slug must be uniq',
                    variant: 'destructive',
                });

                return;
            }

            const tagsData = tagsValues.reduce((acc: string[], { value }) => {
                const exist = tags.find(tag => tag.label === value);
                if (exist) acc.push(exist.value);
                return acc;
            }, []);

            const data = {
                name: { en: nameEn, uk: nameUk },
                desc: { en: descEn, uk: descUk },
                text: { en: textEn, uk: textUk },
                slug,
                userId,
                tags: tagsData,
            };

            const { status, message, data: article } = await addArticle(data);

            if (status === ResponseStatus.ERROR) {
                toast({
                    title: 'Error acquired!',
                    description: message,
                    variant: 'destructive',
                });
            }

            if (status === ResponseStatus.SUCCESS && article) {
                const successMessage = 'Article created successfully';

                if (fileData) {
                    const fileUri = await getFileUri(fileData.file);

                    const { status, url } = await uploadToCloudinary({
                        fileUri,
                        fileName: fileData.fileName,
                        folder: `article_${slug}`,
                    });

                    if (status === ResponseStatus.ERROR) {
                        toast({
                            title: String(status),
                            description: 'Article created, but image load failed!',
                        });
                    }

                    if (url) {
                        const data = { image: url };

                        const { status } = await updateArticle({
                            id: (article as { id: string }).id,
                            data,
                        });

                        if (status === ResponseStatus.SUCCESS) {
                            toast({
                                title: 'Success',
                                description: successMessage,
                                variant: 'success',
                            });

                            resetState();
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

                resetState();

                toast({
                    title: 'Success',
                    description: successMessage,
                    variant: 'success',
                });
            }
        });
    };

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
                            <FormInputField<AddArticleValues>
                                {...item}
                                label={t(item.name)}
                                key={item.name}
                                control={form.control}
                                required
                                disabled={isPending}
                                error={!!errors[item.name as keyof AddArticleValues]}
                                name={item.name as keyof AddArticleValues}
                                {...(item.name === 'tags'
                                    ? {
                                          selectItems: tags.map(({ label }) => ({
                                              label,
                                              value: label,
                                          })),
                                      }
                                    : {})}
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

export default AddNewsForm;
