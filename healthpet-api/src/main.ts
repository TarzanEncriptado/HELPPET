import { ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import helmet from 'helmet'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const config = app.get(ConfigService)
  const jwtSecret = config.getOrThrow<string>('JWT_SECRET')

  if (jwtSecret.length < 32) {
    throw new Error('JWT_SECRET must contain at least 32 characters.')
  }

  app.use(helmet())
  app.setGlobalPrefix('api')
  app.enableCors({
    origin: config.getOrThrow<string>('FRONTEND_ORIGIN'),
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  )

  await app.listen(config.get<number>('PORT', 3000), '0.0.0.0')
}

void bootstrap()
