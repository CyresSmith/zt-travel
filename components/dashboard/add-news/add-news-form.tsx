'use client';

import { useSession } from 'next-auth/react';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';

import { useLocale, useTranslations } from 'next-intl';

import { zodResolver } from '@hookform/resolvers/zod';
import type { z } from 'zod';

import MainImageLoad from '../main-image-load';

import { Button } from '@ui/button';
import { Form } from '@ui/form';

import FormInputField from '@components/form-input-field';

import { AddArticleSchema } from '@schemas';

import { useToast } from '@hooks';

import { ResponseStatus } from '@enums';

import { getFileUri, getLocaleValue, getSlug } from '@utils';

import { useArticleTags } from '@data/tags/queries';

import addArticle from '@actions/articles/add-article';
import getArticleBySlug from '@actions/articles/get-article-by-slug';
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

const AddNewsForm = () => {
    const locale = useLocale();
    const { data: session } = useSession();
    const t = useTranslations('dashboard.addNews');
    const { toast } = useToast();
    const [fileData, setFileData] = useState<null | { file: File; fileName: string }>(null);

    const { data: tags } = useArticleTags();

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

    const resetState = () => {
        form.reset();
        setFileData(null);
    };

    const handleSubmit = async (values: AddArticleValues) => {
        if (!userId) return;

        const { nameEn, nameUk, textEn, textUk, descEn, descUk, tags: tagsValues } = values;

        const slug = getSlug(nameEn);

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
                const exist = tags?.find(tag => getLocaleValue(tag.name, locale) === value);

                if (exist) acc.push(exist.id);
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

            const article = await addArticle(data);

            if (article) {
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

                        const update = await updateArticle({
                            id: article.id,
                            data,
                        });

                        if (update) {
                            toast({
                                title: 'Success',
                                description: successMessage,
                                variant: 'success',
                            });

                            return resetState();
                        }

                        toast({
                            title: 'Failed',
                            description: 'Place update failed',
                            variant: 'destructive',
                        });
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
                                selectItems={
                                    item.name === 'tags'
                                        ? tags?.map(({ name }) => {
                                              const value = getLocaleValue(name, locale);

                                              return {
                                                  label: value,
                                                  value,
                                              };
                                          }) || []
                                        : undefined
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

export default AddNewsForm;
