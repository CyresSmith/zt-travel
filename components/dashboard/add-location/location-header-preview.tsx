'use client';

import { useEffect } from 'react';

import useFileUpload from '@lib/hooks/use-file-upload';

import PlaceImage from '@components/place-page/place-image';

type Props = {
    setFileData: (dto: { file: File; fileName: string }) => void;
    isPending: boolean;
    title: string;
};

const LocationHeaderPreview = ({ setFileData, isPending, title }: Props) => {
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
        <div
            onClick={handleClick}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            className="mb-10 w-full"
        >
            <PlaceImage
                src={previewImage}
                alt={fileName || 'place main image'}
                isPending={isPending}
            >
                {!isPending && (
                    <p className="flex flex-col items-center">
                        <span className="font-bold">{title}</span>
                        <span>.png, .jpg, .jpeg, max 3 MB</span>
                    </p>
                )}
            </PlaceImage>

            <input
                className="invisible"
                type="file"
                accept=".png,.jpg,.jpeg"
                size={3 * 1024 * 1024}
                ref={inputRef}
                onChange={handleSelect}
            />
        </div>
    );
};

export default LocationHeaderPreview;
