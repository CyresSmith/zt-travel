'use client';

import { useEffect } from 'react';

import Image from 'next/image';

import { THEME_TRANSITION } from '@lib/constants';
import useFileUpload from '@lib/hooks/use-file-upload';
import clsx from 'clsx';

import Icon from '@components/icon';

type Props = { setFileData: (dto: { file: File; fileName: string }) => void; isPending: boolean };

const LocationHeaderPreview = ({ setFileData, isPending }: Props) => {
    const {
        fileName,
        file,
        inputRef,
        previewImage,
        reset,
        handleSelect,
        handleClick,
        handleDragOver,
        handleDrop,
    } = useFileUpload();

    useEffect(() => {
        if (!file || !fileName) return;

        setFileData({ file, fileName: `${fileName}_${new Date().toLocaleString()}` });
    }, [file, fileName, setFileData]);

    return (
        <div className="relative mb-10 h-[300px] w-full overflow-hidden rounded-3xl bg-themeSecondary">
            <div
                className={`flex h-full w-full cursor-pointer items-center justify-center fill-themePrimary text-themePrimary hover:fill-themeFg hover:text-themeFg ${THEME_TRANSITION}`}
                onClick={handleClick}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
            >
                {previewImage ? (
                    <Image
                        src={previewImage}
                        fill
                        alt={fileName || ''}
                        style={{ objectFit: 'cover' }}
                    />
                ) : (
                    <div className="flex flex-col items-center gap-5">
                        <Icon
                            name={isPending ? 'black-hole' : 'image'}
                            width={100}
                            height={100}
                            className={clsx(isPending && 'animate-spin')}
                        />

                        {!isPending && (
                            <p className="flex flex-col items-center">
                                <span className="font-bold">
                                    Натисніть для додавання або перетягніть сюди файл
                                </span>
                                <span>.png, .jpg, .jpeg</span>
                            </p>
                        )}
                    </div>
                )}
            </div>

            <input
                className="invisible"
                type="file"
                accept=".png,.jpg,.jpeg"
                size={5 * 1024 * 1024}
                ref={inputRef}
                onChange={handleSelect}
            />
        </div>
    );
};

export default LocationHeaderPreview;
