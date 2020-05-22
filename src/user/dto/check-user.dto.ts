import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsEmail, IsNotEmpty } from 'class-validator'

export class CheckUserDto {
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  readonly email: string

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly password: string
}