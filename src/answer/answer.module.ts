import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PassportModule } from '@nestjs/passport'

import { AnswerService } from './answer.service'
import { AnswerController } from './answer.controller'

import { Answer } from './entity/answer.entity'

import { UserModule } from '../user/user.module'
import { QuestionModule } from '../question/question.module'

@Module({
  imports: [
    TypeOrmModule.forFeature([Answer]),
    PassportModule.register({ defaultStrategy: 'access-jwt' }),
    UserModule,
    QuestionModule
  ],
  providers: [AnswerService],
  controllers: [AnswerController]
})
export class AnswerModule {}