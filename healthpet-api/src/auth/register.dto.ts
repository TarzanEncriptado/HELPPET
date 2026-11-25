import { Transform } from 'class-transformer'
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator'

export class RegisterDto {
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  nome!: string

  @Transform(({ value }) => (typeof value === 'string' ? value.trim().toLowerCase() : value))
  @IsEmail()
  @MaxLength(254)
  email!: string

  @IsString()
  @MinLength(12)
  @MaxLength(128)
  senha!: string
}
