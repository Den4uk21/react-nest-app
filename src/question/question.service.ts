import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { UserService } from '../user/user.service'
import { ProfileService } from '../profile/profile.service'

import { Question } from './entity/question.entity'

import { CreateQuestionDto } from './dto/create-question.dto'

import { ILinkQuestion } from './interfaces/link-question.interface'
import { IGetQuestion } from './interfaces/get-question.interface'

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(Question)
    private questionsRepository: Repository<Question>,
    private readonly userService: UserService,
    private readonly profileService: ProfileService
  ) {}

  async createQuestion(userId: string, createQuestionDto: CreateQuestionDto): Promise<void> {
    const user = await this.userService.findById(userId)

    const question = await this.questionsRepository.create({ ...createQuestionDto, user })
    await this.questionsRepository.save(question)
  }

  async getUserQuestions(userId: string): Promise<Question[]> {
    return this.questionsRepository.find({ where: { user: userId } })
  }

  async getAllQuestions(): Promise<ILinkQuestion[]> {
    const questions = await this.questionsRepository.find()
    const response = questions.map((question) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { descriptions, ...data } = question
      return data
    })

    return response
  }

  async getQuestion(questionId: string): Promise<IGetQuestion> {
    const { user, ...question } = await this.questionsRepository.findOne(questionId, { relations: ['user'] })
    if(!question) throw new HttpException('Question not found!', HttpStatus.NOT_FOUND)

    return {
      ...question,
      userName: user.userName,
      avatarUrl: this.profileService.getAvatar(user.avatarId)
    }
  }

  async updateQuestion(userId: string, questionId: string, updateQuestionDto: CreateQuestionDto): Promise<void> {
    const question = await this.questionsRepository.findOne(questionId, { relations: ['user'] })
    if(question.user.id !== userId) throw new HttpException('Forbidden!', HttpStatus.FORBIDDEN)

    await this.questionsRepository.update(questionId, updateQuestionDto)
  }

  async deleteQuestion(userId: string, questionId: string): Promise<void> {
    const question = await this.questionsRepository.findOne(questionId, { relations: ['user'] })
    if(question.user.id !== userId) throw new HttpException('Forbidden!', HttpStatus.FORBIDDEN)

    await this.questionsRepository.delete(question)
  }
}