import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PassportModule } from '@nestjs/passport'

import { AnswerService } from './answer.service'

import { Answer } from './entity/answer.entity'
import { Question } from '../question/entity/question.entity'

import { UserModule } from '../user/user.module'
import { AnswerController } from './answer.controller'

@Module({
  imports: [
    TypeOrmModule.forFeature([Answer, Question]),
    PassportModule.register({ defaultStrategy: 'access-jwt' }),
    UserModule
  ],
  providers: [AnswerService],
  controllers: [AnswerController]
})
export class AnswerModule {}