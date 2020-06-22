import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsNotEmpty } from 'class-validator'

export class CreateAnswerDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly answer: string
}