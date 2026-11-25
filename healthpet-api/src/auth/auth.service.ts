import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Prisma } from '@prisma/client'
import * as argon2 from 'argon2'
import { randomBytes } from 'node:crypto'
import { PrismaService } from '../prisma/prisma.service'
import { AuthenticatedUser, toPublicUser } from './authenticated-user'
import { LoginDto } from './login.dto'
import { RegisterDto } from './register.dto'

@Injectable()
export class AuthService {
  private readonly dummyPasswordHash = argon2.hash(randomBytes(32).toString('hex'))

  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    const passwordHash = await argon2.hash(dto.senha, { type: argon2.argon2id })

    try {
      const user = await this.prisma.user.create({
        data: {
          nome: dto.nome.trim(),
          email: dto.email,
          passwordHash,
        },
        select: { id: true, nome: true, email: true, role: true },
      })

      return toPublicUser(user)
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
        throw new ConflictException('Este e-mail já está cadastrado.')
      }

      throw error
    }
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    })

    const passwordHash = user?.passwordHash ?? (await this.dummyPasswordHash)
    const passwordMatches = await argon2.verify(passwordHash, dto.senha)

    if (!user || !passwordMatches) {
      throw new UnauthorizedException('E-mail ou senha inválidos.')
    }

    const accessToken = await this.jwt.signAsync({ sub: user.id })
    const publicUser: AuthenticatedUser = {
      id: user.id,
      nome: user.nome,
      email: user.email,
      role: user.role,
    }

    return { accessToken, user: toPublicUser(publicUser) }
  }
}
