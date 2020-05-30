import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsNotEmpty } from 'class-validator'

export class UpdateAnswerDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly answer: string
}