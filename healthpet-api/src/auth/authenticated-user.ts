import { UserRole } from '@prisma/client'

export type AuthenticatedUser = {
  id: string
  nome: string
  email: string
  role: UserRole
}

export function toPublicUser(user: AuthenticatedUser) {
  return {
    id: user.id,
    nome: user.nome,
    email: user.email,
    role: user.role === UserRole.ADMIN ? 'admin' : 'user',
  }
}
