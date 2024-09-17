import type { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import Facebook from 'next-auth/providers/facebook';
import Google from 'next-auth/providers/google';

import { LoginSchema } from '@lib/schemas';
import bcrypt from 'bcryptjs';

import { getUserByEmail } from './data/user';

export default {
    providers: [
        Facebook({
            clientId: process.env.AUTH_FACEBOOK_ID || '',
            clientSecret: process.env.AUTH_FACEBOOK_SECRET || '',
        }),
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID || '',
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
            authorization: {
                params: {
                    scope: 'openid email profile',
                },
            },
        }),
        Credentials({
            credentials: {
                email: {},
                password: {},
            },
            authorize: async credentials => {
                const { success, data } = LoginSchema.safeParse(credentials);

                let user = null;

                if (success) {
                    const { email, password } = data;

                    const existUser = await getUserByEmail(email);

                    if (!existUser || !existUser?.password) return null;

                    const passwordMatch = await bcrypt.compare(password, existUser.password);

                    if (passwordMatch) user = existUser;
                }

                return user;
            },
        }),
    ],
    secret: process.env.AUTH_SECRET,
} satisfies NextAuthConfig;
