import type { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import Facebook from 'next-auth/providers/facebook';
import Google from 'next-auth/providers/google';

import bcrypt from 'bcryptjs';

import { getUserByEmail } from './data/user';

import {
    AUTH_FACEBOOK_ID,
    AUTH_FACEBOOK_SECRET,
    AUTH_SECRET,
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
} from '@config';

import { SignInSchema } from '@schemas';

import prisma from '@prisma-util';

import { PrismaAdapter } from '@auth/prisma-adapter';

export default {
    adapter: PrismaAdapter(prisma),
    secret: AUTH_SECRET,
    session: { strategy: 'jwt' },
    providers: [
        Facebook({
            clientId: AUTH_FACEBOOK_ID,
            clientSecret: AUTH_FACEBOOK_SECRET,
        }),
        Google({
            clientId: GOOGLE_CLIENT_ID,
            clientSecret: GOOGLE_CLIENT_SECRET,
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
