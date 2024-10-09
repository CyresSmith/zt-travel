'use server';

import { AuthError } from 'next-auth';

import prisma from '@lib/prisma';
import { DEFAULT_SIGN_IN_REDIRECT } from '@lib/routes/index.ts';
import { SignInSchema } from '@lib/schemas';
import { generateTwoFactorToken, generateVerificationToken } from '@lib/tokens/index';
import { type z } from 'zod';

import { signIn } from '@auth';

import { sendTwoFactorTokenEmail, sendVerificationEmail } from '@data/mail';
import { getTwoFactorConfirmationByUserId } from '@data/two-factor-confirmation';
import { getTwoFactorTokenByEmail } from '@data/two-factor-token';
import { getUserByEmail } from '@data/user';

export const login = async (values: z.infer<typeof SignInSchema>) => {
    const { success, data } = SignInSchema.safeParse(values);

    if (!success) return { error: 'Invalid fields!' };

    const existingUser = await getUserByEmail(data.email);

    if (!existingUser || !existingUser.email || !existingUser.password) {
        return { error: 'Email does not exist!' };
    }

    const { email, emailVerified, isTwoFactorEnable } = existingUser;

    if (!emailVerified) {
        const { email, token } = await generateVerificationToken(existingUser.email);

        await sendVerificationEmail({ email, token });

        return { success: 'Confirmation email sent!' };
    }

    if (isTwoFactorEnable && email) {
        if (data.code) {
            const twoFactorToken = await getTwoFactorTokenByEmail(email);

            if (!twoFactorToken || twoFactorToken.token !== data.code) {
                return { error: 'Invalid code!' };
            }

            const hasExpired = new Date(twoFactorToken.expires) < new Date();

            if (hasExpired) {
                return { error: 'Code expired!' };
            }

            await prisma.twoFactorToken.delete({ where: { id: twoFactorToken.id } });

            const existingConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id);

            if (existingConfirmation) {
                await prisma.twoFactorConfirmation.delete({
                    where: { id: existingConfirmation.id },
                });
            }

            await prisma.twoFactorConfirmation.create({ data: { userId: existingUser.id } });
        } else {
            const { email, token } = await generateTwoFactorToken(existingUser.email);

            await sendTwoFactorTokenEmail({ email, token });

            return { twoFactor: true };
        }
    }

    try {
        await signIn('credentials', {
            ...data,
            redirectTo: DEFAULT_SIGN_IN_REDIRECT,
        });
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return { error: 'Invalid credentials!' };

                default:
                    return { error: 'Something went wrong!' };
            }
        }

        throw error;
    }
};
