'use server';

import prisma from '@lib/prisma';
import { generateVerificationToken } from '@lib/tokens/index';
import bcrypt from 'bcryptjs';
import { type z } from 'zod';

import { SignUpSchema } from '@schemas';

import { sendVerificationEmail } from '@data/mail';
import { getUserByEmail } from '@data/user';

export const register = async (values: z.infer<typeof SignUpSchema>) => {
    const { success, data } = SignUpSchema.safeParse(values);

    if (!success) {
        return { error: 'Invalid fields!' };
    }

    const { password, email, name } = data;

    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await getUserByEmail(email);

    if (existingUser) {
        return { error: 'Email in use!' };
    }

    await prisma.user.create({ data: { email, name, password: hashedPassword } });

    const { email: tokenMail, token } = await generateVerificationToken(email);

    await sendVerificationEmail({ email: tokenMail, token });

    return { success: 'Email verification sent!' };
};
