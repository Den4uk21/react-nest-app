import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsNotEmpty, IsEnum } from 'class-validator'
import { genderEnum } from 'src/user/enums/gender.enum'

export class UpdateProfileDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly userName: string

  @ApiProperty({ enum: genderEnum })
  @IsEnum(genderEnum)
  @IsNotEmpty()
  readonly gender: string

  @ApiProperty()
  readonly motto: string | null

  @ApiProperty()
  readonly bio: string | null
}