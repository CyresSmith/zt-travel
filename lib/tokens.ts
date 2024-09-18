import crypto from 'crypto';
import { v4 as uuidv4 } from 'uuid';

import prisma from './prisma';

import { getPasswordResetTokenByEmail } from '@data/password-reset-token';
import { getTwoFactorTokenByEmail } from '@data/two-factor-token';
import { getVerificationTokenByEmail } from '@data/vrification-token';

const getExpires = (minutes = 5) => new Date(new Date().getTime() + minutes * 60 * 1000);

export const generateVerificationToken = async (email: string) => {
    const token = uuidv4();
    const expires = getExpires(60);

    const existingToken = await getVerificationTokenByEmail(email);

    if (existingToken) {
        await prisma.verificationToken.delete({ where: { id: existingToken.id } });
    }

    return await prisma.verificationToken.create({ data: { email, token, expires } });
};

export const generatePasswordResetToken = async (email: string) => {
    const token = uuidv4();
    const expires = getExpires(15);

    const existingToken = await getPasswordResetTokenByEmail(email);

    if (existingToken) {
        await prisma.passwordResetToken.delete({ where: { id: existingToken.id } });
    }

    return await prisma.passwordResetToken.create({ data: { email, token, expires } });
};

export const generateTwoFactorToken = async (email: string) => {
    const token = crypto.randomInt(100_000, 1_000_000).toString();
    const expires = getExpires();

    const existingToken = await getTwoFactorTokenByEmail(email);

    if (existingToken) {
        await prisma.twoFactorToken.delete({ where: { id: existingToken.id } });
    }

    return await prisma.twoFactorToken.create({ data: { email, token, expires } });
};
