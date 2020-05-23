import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString, Matches, IsEmail, IsEnum } from 'class-validator'
import { genderEnum } from '../enums/gender.enum'

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly userName: string

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  readonly email: string

  @ApiProperty({ enum: genderEnum })
  @IsEnum(genderEnum)
  @IsNotEmpty()
  readonly gender: string

  @ApiProperty()
  @IsString()
  @Matches(
    /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/,
    { message: 'Weak password' },
  )
  @IsNotEmpty()
  readonly password: string
}