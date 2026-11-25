import { Module } from '@nestjs/common'
import { APP_GUARD } from '@nestjs/core'
import { ConfigModule } from '@nestjs/config'
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler'
import * as Joi from 'joi'
import { AuthModule } from './auth/auth.module'
import { JwtAuthGuard } from './auth/jwt-auth.guard'
import { RolesGuard } from './auth/roles.guard'
import { HealthController } from './health.controller'
import { PrismaModule } from './prisma/prisma.module'
import { UsersModule } from './users/users.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        NODE_ENV: Joi.string().valid('development', 'production', 'test').default('development'),
        PORT: Joi.number().port().default(3000),
        FRONTEND_ORIGIN: Joi.string().uri({ scheme: ['http', 'https'] }).required(),
        DATABASE_URL: Joi.string().uri({ scheme: ['mysql'] }).required(),
        JWT_SECRET: Joi.string().min(32).required(),
        ADMIN_EMAIL: Joi.string().email().optional(),
        ADMIN_PASSWORD: Joi.string().min(14).optional(),
      }),
    }),
    ThrottlerModule.forRoot([{ ttl: 60_000, limit: 100 }]),
    PrismaModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [HealthController],
  providers: [
    { provide: APP_GUARD, useClass: ThrottlerGuard },
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    { provide: APP_GUARD, useClass: RolesGuard },
  ],
})
export class AppModule {}
