import type { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import Facebook from 'next-auth/providers/facebook';
import Google from 'next-auth/providers/google';

import bcrypt from 'bcryptjs';

import { getUserByEmail } from './data/user';

import { SignInSchema } from '@schemas';

import prisma from '@prisma-util';

import { PrismaAdapter } from '@auth/prisma-adapter';

export default {
    adapter: PrismaAdapter(prisma),
    secret: process.env.AUTH_SECRET,
    session: { strategy: 'jwt' },
    providers: [
        Facebook({
            clientId: process.env.AUTH_FACEBOOK_ID,
            clientSecret: process.env.AUTH_FACEBOOK_SECRET,
        }),
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            authorization: {
                params: {
                    scope: 'openid email profile',
                },
            },
        }),
        Credentials({
            async authorize(credentials) {
                const { success, data } = SignInSchema.safeParse(credentials);

                if (success) {
                    const { email, password } = data;

                    const user = await getUserByEmail(email);

                    if (!user || !user?.password) return null;

                    const passwordMatch = await bcrypt.compare(password, user.password);

                    if (passwordMatch) return { ...user, isOAuth: false };
                }

                return null;
            },
        }),
    ],
} satisfies NextAuthConfig;
