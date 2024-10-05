'use server';

import { UserRole } from '@prisma/client';

import { auth } from '@auth';

export const admin = async () => {
    const session = await auth();
    const role = session?.user?.role;

    if (role !== UserRole.ADMIN) {
        return { error: 'Forbidden' };
    }

    return { success: 'Allowed' };
};
