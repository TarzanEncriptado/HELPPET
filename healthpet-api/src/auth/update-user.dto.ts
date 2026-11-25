import { Transform } from 'class-transformer'
import { IsEmail, IsOptional, IsString, MaxLength, MinLength } from 'class-validator'

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  nome?: string

  @IsOptional()
  @Transform(({ value }) => (typeof value === 'string' ? value.trim().toLowerCase() : value))
  @IsEmail()
  @MaxLength(254)
  email?: string
}
