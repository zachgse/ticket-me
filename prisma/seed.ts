import bcrypt from "bcryptjs";

import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
    const hashedPassword = await bcrypt.hash("admin",10);
    await prisma.user.create({
       data: {
        name: "Master Admin",
        password: hashedPassword,
        email: "admin@gmail.com",
        type: "admin"
       }
    })

}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
