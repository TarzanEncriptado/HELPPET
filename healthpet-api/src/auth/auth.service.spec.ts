import { Test } from '@nestjs/testing'
import { JwtService } from '@nestjs/jwt'
import { UserRole } from '@prisma/client'
import * as argon2 from 'argon2'
import { PrismaService } from '../prisma/prisma.service'
import { AuthService } from './auth.service'

describe('AuthService', () => {
  let service: AuthService
  const prisma = {
    user: {
      create: jest.fn(),
      findUnique: jest.fn(),
    },
  }
  const jwt = { signAsync: jest.fn().mockResolvedValue('signed-token') }

  beforeEach(async () => {
    jest.clearAllMocks()
    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: PrismaService, useValue: prisma },
        { provide: JwtService, useValue: jwt },
      ],
    }).compile()
    service = module.get(AuthService)
  })

  it('hashes registration passwords and returns no credential fields', async () => {
    prisma.user.create.mockImplementation(async ({ data }) => ({
      id: 'user-id',
      nome: data.nome,
      email: data.email,
      role: UserRole.USER,
    }))

    const result = await service.register({
      nome: 'Test User',
      email: 'test@example.com',
      senha: 'long-and-unique-passphrase',
    })

    const createCall = prisma.user.create.mock.calls[0][0]
    expect(await argon2.verify(createCall.data.passwordHash, 'long-and-unique-passphrase')).toBe(
      true,
    )
    expect(createCall.data.role).toBeUndefined()
    expect(result).toEqual({
      id: 'user-id',
      nome: 'Test User',
      email: 'test@example.com',
      role: 'user',
    })
    expect(result).not.toHaveProperty('passwordHash')
  })

  it('returns a signed token and server-provided role after valid login', async () => {
    const passwordHash = await argon2.hash('long-and-unique-passphrase')
    prisma.user.findUnique.mockResolvedValue({
      id: 'admin-id',
      nome: 'Admin',
      email: 'admin@example.com',
      passwordHash,
      role: UserRole.ADMIN,
    })

    const result = await service.login({
      email: 'admin@example.com',
      senha: 'long-and-unique-passphrase',
    })

    expect(jwt.signAsync).toHaveBeenCalledWith({ sub: 'admin-id' })
    expect(result).toEqual({
      accessToken: 'signed-token',
      user: {
        id: 'admin-id',
        nome: 'Admin',
        email: 'admin@example.com',
        role: 'admin',
      },
    })
    expect(result.user).not.toHaveProperty('passwordHash')
  })

  it('rejects invalid credentials without signing a token', async () => {
    prisma.user.findUnique.mockResolvedValue(null)

    await expect(
      service.login({ email: 'unknown@example.com', senha: 'wrong-password' }),
    ).rejects.toThrow('E-mail ou senha inválidos.')
    expect(jwt.signAsync).not.toHaveBeenCalled()
  })
})
