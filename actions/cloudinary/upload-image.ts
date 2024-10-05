'use server';

import { ResponseStatus } from '@lib/enums';
import type { ActionResponse } from '@lib/types';
import cloudinary from '@lib/utils/cloudinary';
import { UserRole } from '@prisma/client';

import { auth } from '@auth';

type UploadResponse = ActionResponse & { url?: string };

export type CloudinaryUploadDto = { fileUri: string; fileName: string; folder: string };

const uploadToCloudinary = async ({
    fileUri,
    fileName,
    folder,
}: CloudinaryUploadDto): Promise<UploadResponse> => {
    try {
        const session = await auth();
        const role = session?.user?.role;

        if (!session || !role || role !== UserRole.ADMIN) {
            return { status: ResponseStatus.ERROR, message: 'Forbidden' };
        }

        const res = await cloudinary.uploader.upload(fileUri, {
            invalidate: true,
            resource_type: 'auto',
            filename_override: fileName,
            folder,
            use_filename: true,
        });

        if (res.secure_url) {
            return { status: ResponseStatus.SUCCESS, message: 'Image loaded', url: res.secure_url };
        }

        return { status: ResponseStatus.ERROR, message: res.message };
    } catch (error) {
        return { status: ResponseStatus.ERROR, message: 'Something went wrong' };
    }
};

export default uploadToCloudinary;
