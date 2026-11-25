"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const client_1 = require("@prisma/client");
const argon2 = require("argon2");
const prisma = new client_1.PrismaClient();
async function main() {
    const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
    const password = process.env.ADMIN_PASSWORD;
    if (!email || !password || password.length < 14) {
        throw new Error('ADMIN_EMAIL and a unique ADMIN_PASSWORD of at least 14 characters are required.');
    }
    const passwordHash = await argon2.hash(password, { type: argon2.argon2id });
    await prisma.user.upsert({
        where: { email },
        update: {},
        create: {
            nome: 'Administrador',
            email,
            passwordHash,
            role: client_1.UserRole.ADMIN,
        },
    });
    console.info(`Admin account ensured for ${email}.`);
}
main()
    .catch((error) => {
    console.error('Could not seed the administrator account.');
    throw error;
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map