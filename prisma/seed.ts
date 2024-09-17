import { PrismaClient } from '@prisma/client';

import places from '../seed/places';

const prisma = new PrismaClient();

async function main() {
    await prisma.user.create({
        data: {
            firstname: 'Ivan',
            password: 'Aa1Aa1Aa1',
            email: `madnezzz5@gmail.com`,
            role: 'ADMIN',
        },
    });

    await prisma.place.createMany({
        data: places,
    });
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
