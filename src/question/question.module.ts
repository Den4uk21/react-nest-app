import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PassportModule } from '@nestjs/passport'

import { QuestionService } from './question.service'
import { QuestionController } from './question.controller'

import { Question } from './entity/question.entity'

import { UserModule } from '../user/user.module'
import { ProfileModule } from '../profile/profile.module'
import { AnswerModule } from '../answer/answer.module'

@Module({
  imports: [
    TypeOrmModule.forFeature([Question]),
    PassportModule.register({ defaultStrategy: 'access-jwt' }),
    UserModule,
    ProfileModule,
    AnswerModule
  ],
  providers: [QuestionService],
  controllers: [QuestionController]
})
export class QuestionModule {}