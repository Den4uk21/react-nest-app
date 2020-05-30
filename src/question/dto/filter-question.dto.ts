import { ApiProperty } from '@nestjs/swagger'
import { IsEnum, IsNotEmpty } from 'class-validator'

import { questionTypeEnum } from '../enums/question-type.enum'

export class FilterQuestionDto {
  @ApiProperty()
  @IsEnum(questionTypeEnum)
  @IsNotEmpty()
  readonly type: string

  @ApiProperty()
  readonly categories?: string[]
}