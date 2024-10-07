import prisma from '@prisma-util';

export const getTwoFactorConfirmationByUserId = async (userId: string) => {
    try {
        return await prisma.twoFactorConfirmation.findUnique({ where: { userId } });
    } catch (error) {
        return null;
    }
};
