import type { ChangeEvent, DragEvent, RefObject } from 'react';
import { useRef, useState } from 'react';

interface ImageUploadHookResult {
    file: File | undefined;
    previewImage: string | undefined;
    fileName: string | undefined;
    inputRef: RefObject<HTMLInputElement>;
    handleSelect: (e: ChangeEvent<HTMLInputElement>) => void;
    handleDragOver: (e: DragEvent<HTMLDivElement>) => void;
    handleDrop: (e: DragEvent<HTMLDivElement>) => void;
    handleClick: () => void;
    reset: () => void;
}

export const useFileUpload = (): ImageUploadHookResult => {
    const [file, setFile] = useState<File | undefined>();
    const [previewImage, setPreviewImage] = useState<string | undefined>();
    const [fileName, setFileName] = useState<string | undefined>();

    const inputRef = useRef<HTMLInputElement>(null);

    const handleClick = () => inputRef.current?.click();

    const handleSelect = (e: ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];

        if (selectedFile) {
            setFile(selectedFile);
            setFileName(selectedFile.name);
            setPreviewImage(URL.createObjectURL(selectedFile));
        }
    };

    const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();

        const droppedFile = e.dataTransfer.files?.[0];

        if (droppedFile) {
            setFile(droppedFile);
            setFileName(droppedFile.name);
            setPreviewImage(URL.createObjectURL(droppedFile));
        }
    };

    const reset = () => {
        setFile(undefined);
        setPreviewImage(undefined);
        setFileName(undefined);
    };

    return {
        file,
        previewImage,
        fileName,
        handleClick,
        handleSelect,
        handleDragOver,
        handleDrop,
        inputRef,
        reset,
    };
};
