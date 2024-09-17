import type { DefaultSession } from 'next-auth';

import type { UserRole } from '@prisma/client';

declare module 'next-auth' {
    interface User {
        role: UserRole;
    }

    interface Session {
        user: User & DefaultSession['user'];
    }
}
