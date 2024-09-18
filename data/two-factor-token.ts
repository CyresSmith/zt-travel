import prisma from '@lib/prisma';

export const getTwoFactorTokenByEmail = async (email: string) => {
    try {
        return await prisma.twoFactorToken.findFirst({ where: { email } });
    } catch (error) {
        return null;
    }
};

export const getTwoFactorTokenByToken = async (token: string) => {
    try {
        return await prisma.twoFactorToken.findUnique({ where: { token } });
    } catch (error) {
        return null;
    }
};
