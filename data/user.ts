import prisma from '@prisma-util';

export const getUserByEmail = async (email: string) => {
    try {
        return await prisma.user.findUnique({ where: { email } });
    } catch (error) {
        return null;
    }
};

export const getUserById = async (id: string) => {
    try {
        return await prisma.user.findUnique({ where: { id } });
    } catch (error) {
        return null;
    }
};
