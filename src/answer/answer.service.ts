import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { Answer } from './entity/answer.entity'
import { Question } from '../question/entity/question.entity'

import { UserService } from '../user/user.service'

import { CreateAnswerDto } from './dto/create-answer.dto'
import { UpdateAnswerDto } from './dto/update-answer.dto'

import { IResponse } from '../auth/interfaces/response.interface'

@Injectable()
export class AnswerService {
  constructor(
    @InjectRepository(Answer)
    private answersRepository: Repository<Answer>,

    @InjectRepository(Question)
    private questionsRepository: Repository<Question>,

    private readonly userService: UserService 
  ) {}

  async createAnswer(userId: string, createAnswerDto: CreateAnswerDto): Promise<IResponse> {
    const user = await this.userService.findById(userId)
    const question = await this.questionsRepository.findOne(createAnswerDto.questionId)

    if(!question) throw new HttpException('Question not found!', HttpStatus.NOT_FOUND)

    const answer = await this.answersRepository.create({ answer: createAnswerDto.answer , question, user })
    await this.answersRepository.save(answer)

    return { success: true }
  }

  async getAnswers(questionId: string): Promise<Answer[]> {
    const question = await this.questionsRepository.findOne(questionId, { relations: ['answer'] })
    if(!question) throw new HttpException('Question not found!', HttpStatus.NOT_FOUND)

    const { answer } = question
    return answer
  }

  async updateAnswer(userId: string, answerId: string, updateAnswerDto: UpdateAnswerDto): Promise<IResponse> {
    const answer = await this.answersRepository.findOne(answerId, { relations: ['user'] })
    if(userId !== answer.user.id) throw new HttpException('Forbidden!', HttpStatus.FORBIDDEN)

    await this.answersRepository.update(answerId, updateAnswerDto)
    return { success: true }
  }

  async deleteAnswer(userId: string, answerId: string): Promise<IResponse> {
    const answer = await this.answersRepository.findOne(answerId, { relations: ['user'] })
    if(userId !== answer.user.id) throw new HttpException('Forbidden!', HttpStatus.FORBIDDEN)

    await this.answersRepository.delete(answer)
    return { success: true }
  }

  async isAnswer(userId: string, questionId: string, answerId: string): Promise<IResponse> {
    const user = await this.userService.findById(userId)
    const question = await this.questionsRepository.findOne(questionId, { relations: ['user'] })
    const answer = await this.answersRepository.findOne(answerId)

    if(user.id !== question.user.id) throw new HttpException('Forbidden!', HttpStatus.FORBIDDEN)
    await this.answersRepository.update(answerId, { isAnswer: !answer.isAnswer })

    return { success: true }
  }
}