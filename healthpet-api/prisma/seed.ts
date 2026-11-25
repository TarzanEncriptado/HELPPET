import 'dotenv/config'
import { PrismaClient, UserRole } from '@prisma/client'
import * as argon2 from 'argon2'

const prisma = new PrismaClient()

async function main() {
  const email = process.env.ADMIN_EMAIL?.trim().toLowerCase()
  const password = process.env.ADMIN_PASSWORD

  if (!email || !password || password.length < 14) {
    throw new Error('ADMIN_EMAIL and a unique ADMIN_PASSWORD of at least 14 characters are required.')
  }

  const passwordHash = await argon2.hash(password, { type: argon2.argon2id })
  await prisma.user.upsert({
    where: { email },
    update: {},
    create: {
      nome: 'Administrador',
      email,
      passwordHash,
      role: UserRole.ADMIN,
    },
  })

  console.info(`Admin account ensured for ${email}.`)
}

main()
  .catch((error: unknown) => {
    console.error('Could not seed the administrator account.')
    throw error
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
