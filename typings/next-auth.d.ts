import type { DefaultSession } from 'next-auth';

import type { UserRole } from '@prisma/client';

declare module 'next-auth' {
    interface User {
        role: UserRole;
        id: string;
        isTwoFactorEnable: boolean;
        isOAuth: boolean;
    }

    interface Session {
        user: User & DefaultSession['user'];
    }
}
