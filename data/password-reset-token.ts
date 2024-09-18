import prisma from '@lib/prisma';

export const getPasswordResetTokenByEmail = async (email: string) => {
    try {
        const ResetToken = await prisma.passwordResetToken.findFirst({ where: { email } });

        return ResetToken;
    } catch (error) {
        return null;
    }
};

export const getPasswordResetTokenByToken = async (token: string) => {
    try {
        const ResetToken = await prisma.passwordResetToken.findUnique({ where: { token } });

        return ResetToken;
    } catch (error) {
        return null;
    }
};
