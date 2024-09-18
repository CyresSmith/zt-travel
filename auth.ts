import NextAuth from 'next-auth';

import prisma from '@lib/prisma';
import authConfig from 'auth.config';

import { getAccountByUserId } from '@data/accaunt';
import { getTwoFactorConfirmationByUserId } from '@data/two-factor-confirmation';
import { getUserById } from '@data/user';

export const { auth, handlers, signIn, signOut } = NextAuth({
    pages: {
        signIn: '/auth/login',
        error: '/auth/error',
    },
    events: {
        async linkAccount({ user }) {
            if (user.id) {
                await prisma.user.update({
                    where: { id: user.id },
                    data: { emailVerified: new Date() },
                });
            }
        },
    },
    callbacks: {
        async signIn({ user, account }) {
            const isCredentials = account?.provider === 'credentials';
            const isGoogle = account?.provider === 'google';
            const isFacebook = account?.provider === 'facebook';

            if (isCredentials && user.id) {
                const existingUser = await getUserById(user.id);

                if (existingUser?.isTwoFactorEnable) {
                    const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(
                        existingUser.id
                    );

                    if (!twoFactorConfirmation) return false;

                    await prisma.twoFactorConfirmation.delete({
                        where: { id: twoFactorConfirmation.id },
                    });
                }

                return !!existingUser?.emailVerified;
            }

            return !!(isGoogle || isFacebook);
        },
        async session({ token, session }) {
            if (session.user) {
                if (token.sub) session.user.id = token.sub;
                if (token.name) session.user.name = token.name;
                if (token.email) session.user.email = token.email;
                if (token.role) session.user.role = token.role as Role;
                if (token.isOAuth) session.user.isOAuth = token.isOAuth as boolean;
            }

            return session;
        },
        async jwt({ token }) {
            if (!token.sub) return token;

            const existingUser = await getUserById(token.sub);

            if (!existingUser) return token;

            token.role = existingUser.role;
            token.name = existingUser.name;
            token.email = existingUser.email;
            token.isTwoFactorEnable = existingUser.isTwoFactorEnable;

            const existingAccount = await getAccountByUserId(existingUser.id);

            token.isOAuth = !!existingAccount;

            return token;
        },
    },
    ...authConfig,
});
