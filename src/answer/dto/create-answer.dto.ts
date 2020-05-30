import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsNotEmpty, IsUUID } from 'class-validator'

export class CreateAnswerDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly answer: string

  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  readonly questionId: string
}