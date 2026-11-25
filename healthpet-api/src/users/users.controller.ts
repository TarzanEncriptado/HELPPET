import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Req } from '@nestjs/common'
import { UserRole } from '@prisma/client'
import { Request } from 'express'
import { AuthenticatedUser } from '../auth/authenticated-user'
import { Roles } from '../auth/roles.decorator'
import { UpdateUserDto } from '../auth/update-user.dto'
import { UsersService } from './users.service'

type AuthenticatedRequest = Request & { user: AuthenticatedUser }

@Controller('users')
@Roles(UserRole.ADMIN)
export class UsersController {
  constructor(private readonly users: UsersService) {}

  @Get()
  findAll() {
    return this.users.findAll()
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    return this.users.update(id, dto)
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string, @Req() request: AuthenticatedRequest) {
    return this.users.remove(id, request.user)
  }
}
