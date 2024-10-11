import { PrismaClient } from '@prisma/client';

import { NODE_ENV } from '@config';

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

const prisma = globalForPrisma.prisma || new PrismaClient();

export default prisma;

if (NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
