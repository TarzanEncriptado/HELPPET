import { Body, Controller, Get, Post, Req } from '@nestjs/common'
import { Throttle } from '@nestjs/throttler'
import { Request } from 'express'
import { AuthenticatedUser, toPublicUser } from './authenticated-user'
import { AuthService } from './auth.service'
import { LoginDto } from './login.dto'
import { Public } from './public.decorator'
import { RegisterDto } from './register.dto'

type AuthenticatedRequest = Request & { user: AuthenticatedUser }

@Controller('auth')
export class AuthController {
  constructor(private readonly auth: AuthService) {}

  @Public()
  @Throttle({ default: { limit: 5, ttl: 60_000 } })
  @Post('register')
  register(@Body() dto: RegisterDto) {
    return this.auth.register(dto)
  }

  @Public()
  @Throttle({ default: { limit: 5, ttl: 60_000 } })
  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.auth.login(dto)
  }

  @Get('me')
  getCurrentUser(@Req() request: AuthenticatedRequest) {
    return toPublicUser(request.user)
  }
}
