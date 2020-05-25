import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsNotEmpty, IsArray } from 'class-validator'
import { categoriesEnum } from '../enums/categories.enum'

export class CreateQuestionDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly title: string

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly descriptions: string

  @ApiProperty({ enum: categoriesEnum })
  @IsArray()
  @IsNotEmpty()
  readonly category: string[]
}