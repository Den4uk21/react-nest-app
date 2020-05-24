import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsEmail } from 'class-validator'

export class EmailProfileDto {
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  readonly email: string
}