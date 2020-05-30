import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsNotEmpty, IsArray } from 'class-validator'

export class CreateQuestionDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly title: string

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly descriptions: string

  @ApiProperty()
  @IsArray()
  @IsNotEmpty()
  readonly categories: string[]
}