import { ConflictException, Injectable, NotFoundException } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { PrismaService } from '../prisma/prisma.service'
import { AuthenticatedUser, toPublicUser } from '../auth/authenticated-user'
import { UpdateUserDto } from '../auth/update-user.dto'

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    const users = await this.prisma.user.findMany({
      orderBy: { nome: 'asc' },
      select: { id: true, nome: true, email: true, role: true },
    })

    return users.map(toPublicUser)
  }

  async update(id: string, dto: UpdateUserDto) {
    try {
      const user = await this.prisma.user.update({
        where: { id },
        data: dto,
        select: { id: true, nome: true, email: true, role: true },
      })

      return toPublicUser(user)
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ConflictException('Este e-mail já está cadastrado.')
        }
        if (error.code === 'P2025') {
          throw new NotFoundException('Usuário não encontrado.')
        }
      }

      throw error
    }
  }

  async remove(id: string, currentUser: AuthenticatedUser) {
    if (id === currentUser.id) {
      throw new ConflictException('Não é permitido excluir a própria conta de administrador.')
    }

    try {
      await this.prisma.user.delete({ where: { id } })
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
        throw new NotFoundException('Usuário não encontrado.')
      }

      throw error
    }
  }
}
