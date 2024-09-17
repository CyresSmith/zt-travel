import NextAuth from 'next-auth';

import { PrismaAdapter } from '@auth/prisma-adapter';
import prisma from '@lib/prisma';
import authConfig from 'auth.config';

export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: PrismaAdapter(prisma),
    pages: {
        signIn: '/signin',
        error: '/auth/error',
    },
    events: {
        async linkAccount({ user }: { user: any }) {
            await prisma.user.update({
                where: { id: user.id },
                data: { emailVerified: new Date() },
            });
        },
    },
    callbacks: {
        session({ session, user }) {
            session.user.role = user.role;
            return session;
        },
    },
    ...authConfig,
});
