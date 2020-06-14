import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsNotEmpty } from 'class-validator'

export class UpdateUsernameDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly userName: string
}