import { ApiProperty } from '@nestjs/swagger'
import { IsString, Matches, IsNotEmpty } from 'class-validator'

export class ChangePassDto {
  @ApiProperty()
  @IsString()
  @Matches(
    /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/,
    { message: 'Weak password' },
  )
  @IsNotEmpty()
  readonly password: string
}