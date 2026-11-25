import 'reflect-metadata'
import { UserRole } from '@prisma/client'
import { ROLES_KEY } from '../auth/roles.decorator'
import { UsersController } from './users.controller'

describe('UsersController authorization', () => {
  it('requires administrator role for every user-management endpoint', () => {
    expect(Reflect.getMetadata(ROLES_KEY, UsersController)).toEqual([UserRole.ADMIN])
  })
})
