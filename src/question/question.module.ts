import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PassportModule } from '@nestjs/passport'

import { QuestionService } from './question.service'
import { QuestionController } from './question.controller'

import { Question } from './entity/question.entity'

import { UserModule } from '../user/user.module'

@Module({
  imports: [
    TypeOrmModule.forFeature([Question]),
    PassportModule.register({ defaultStrategy: 'access-jwt' }),
    UserModule
  ],
  providers: [QuestionService],
  controllers: [QuestionController],
  exports: [QuestionService]
})
export class QuestionModule {}