'use server';

import { revalidatePath } from 'next/cache';

import { z } from 'zod';

import { getUserById } from '@/data/user';
import { currentUser } from '@/lib/auth';
import { db } from '@/lib/db';
import { SettingsSchema } from '@/schemas';

export const settings = async (values: z.infer<typeof SettingsSchema>) => {
    const user = await currentUser();

    if (!user) {
        return { error: 'Unauthorized!' };
    }

    const dbUser = await getUserById(user.id);

    if (!dbUser) {
        return { error: 'Unauthorized!' };
    }

    await db.user.update({ where: { id: dbUser.id }, data: { ...values } });

    revalidatePath('/');

    return { success: 'Settings updated!' };
};
