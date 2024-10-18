'use server';

import prisma from '@prisma-util';

const getUserByEmailAndPass = async (dto: { email: string; password: string }) => {
    const { email, password } = dto;

    try {
        return await prisma.user.findUnique({ where: { email, password } });
    } catch (error) {
        return null;
    }
};

export default getUserByEmailAndPass;
