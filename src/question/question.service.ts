import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { UserService } from '../user/user.service'
import { ProfileService } from '../profile/profile.service'

import { Question } from './entity/question.entity'

import { CreateQuestionDto } from './dto/create-question.dto'
import { FilterQuestionDto } from './dto/filter-question.dto'

import { ILinkQuestion } from './interfaces/link-question.interface'
import { IGetQuestion } from './interfaces/get-question.interface'

import { questionTypeEnum } from './enums/question-type.enum'

@Injectable()
export class QuestionService {
  private readonly limit: number

  constructor(
    @InjectRepository(Question)
    private questionsRepository: Repository<Question>,
    private readonly userService: UserService,
    private readonly profileService: ProfileService
  ) {
    this.limit = 10
  }

  async createQuestion(userId: string, createQuestionDto: CreateQuestionDto): Promise<void> {
    const user = await this.userService.findById(userId)

    const question = await this.questionsRepository.create({ ...createQuestionDto, user })
    await this.questionsRepository.save(question)
  }

  async getCountPages(): Promise<number> {
    const countQuestions = await this.questionsRepository.count()
    
    if(countQuestions % this.limit === 0) return countQuestions / this.limit
    else return (countQuestions - (countQuestions % this.limit)) / this.limit + 1
  }

  async getUserQuestions(userId: string, page: number): Promise<Question[]> {
    const step = this.limit * (page - 1)
    
    return this.questionsRepository.find({ where: { user: userId }, skip: step, take: this.limit })
  }

  async getAllQuestions(page: number, filterQuestionDto: FilterQuestionDto): Promise<ILinkQuestion[]> {
    const step = this.limit * (page - 1)
    const { type, categories } = filterQuestionDto
    
    let questions: Question[]

    if(categories) {
      questions = await this.questionsRepository.find({ skip: step, take: this.limit, where: { categories }, relations: ['answer'] })
    }else {
      questions = await this.questionsRepository.find({ skip: step, take: this.limit, relations: ['answer'] })
    }

    const validQuestions = this.filterQuestions(type, questions)

    const response = validQuestions.map((question) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { descriptions, answer, ...data } = question

      const date = this.getDate(Number(question.date))

      return { ...data, date }
    })

    return response
  }

  async getQuestion(questionId: string): Promise<IGetQuestion> {
    const { user, ...question } = await this.questionsRepository.findOne(questionId, { relations: ['user'] })
    if(!question) throw new HttpException('Question not found!', HttpStatus.NOT_FOUND)

    const date = this.getDate(Number(question.date))

    return {
      ...question,
      date,
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

  private getDate(date: number): string {
    const vailidDate = new Date(date)
    return `${vailidDate.getFullYear()}-${vailidDate.getMonth()}-${vailidDate.getDate()}`
  }

  private filterQuestions(type: string, questions: Question[]): Question[] {
    switch (type) {
      case questionTypeEnum.new:
        return questions.sort((a, b) => a.date - b.date)

        break
      case questionTypeEnum.popular:
        

        break
      case questionTypeEnum.withoutAnswers:
        return questions.filter((question) => question.answer.length === 0)

        break
    }
  }
}