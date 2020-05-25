import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsNotEmpty } from 'class-validator'

export class UpdateProfileDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly userName: string

  @ApiProperty()
  readonly motto: string | null

  @ApiProperty()
  readonly bio: string | null
}