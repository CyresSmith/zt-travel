'use server';

import { z } from 'zod';

import { sendResetPasswordEmail } from '@/data/mail';
import { getUserByEmail } from '@/data/user';
import { generatePasswordResetToken } from '@/lib/tokens';
import { ResetSchema } from '@/schemas';

export const reset = async (values: z.infer<typeof ResetSchema>) => {
    const { success, data } = ResetSchema.safeParse(values);

    if (!success) {
        return { error: 'Invalid email!' };
    }

    const { email } = data;

    const existingUser = await getUserByEmail(email);

    if (!existingUser) {
        return { error: 'Email not found!' };
    }

    const resetToken = await generatePasswordResetToken(email);

    await sendResetPasswordEmail({ email: resetToken.email, token: resetToken.token });

    return { success: 'Reset email sent!' };
};
