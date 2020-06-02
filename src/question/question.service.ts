import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { UserService } from '../user/user.service'
import { ProfileService } from '../profile/profile.service'

import { Question } from './entity/question.entity'

import { CreateQuestionDto } from './dto/create-question.dto'
import { FilterQuestionDto } from './dto/filter-question.dto'

import { ILinkQuestion, ILinkQuestionResponse } from './interfaces/link-question.interface'
import { IGetQuestion } from './interfaces/get-question.interface'
import { IResponse } from '../auth/interfaces/response.interface'

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

  async createQuestion(userId: string, createQuestionDto: CreateQuestionDto): Promise<IResponse> {
    const user = await this.userService.findById(userId)

    const question = await this.questionsRepository.create({ ...createQuestionDto, user })
    await this.questionsRepository.save(question)

    return { success: true }
  }

  async getUserQuestionsNoAnswers(userId: string, page: number): Promise<ILinkQuestionResponse> {
    const questions = await this.questionsRepository.find({ where: { user: userId }, relations: ['answer'] })
    const filteredQuestions = questions.filter((question) => question.answer.length === 0)

    const validQuestions = this.paginationQuestions(page, filteredQuestions)
    return {
      questionsList: this.getValidLinkQuestions(validQuestions),
      amount: filteredQuestions.length
    }
  }

  async getUserQuestionsWithAnswers(userId: string, page: number): Promise<ILinkQuestionResponse> {
    const questions = await this.questionsRepository.find({ where: { user: userId }, relations: ['answer'] })
    const filteredQuestions = questions.filter((question) => question.answer.length !== 0)

    const validQuestions = this.paginationQuestions(page, filteredQuestions)
    return {
      questionsList: this.getValidLinkQuestions(validQuestions),
      amount: filteredQuestions.length
    }
  }

  async getAllQuestions(page: number, filterQuestionDto: FilterQuestionDto): Promise<ILinkQuestionResponse> {
    const { type, categories } = filterQuestionDto
    
    const questions = await this.questionsRepository.find({ relations: ['answer'] })
    let filteredCategoriesQuestions: Question[] = questions

    if(categories) {
      filteredCategoriesQuestions = this.filterCategories(categories, questions)
    }
    
    const filteredQuestions = this.filterQuestions(type, filteredCategoriesQuestions)
    const validQuestions = this.paginationQuestions(page, filteredQuestions)

    return {
      questionsList: this.getValidLinkQuestions(validQuestions),
      amount: filteredQuestions.length
    }
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

  async updateQuestion(userId: string, questionId: string, updateQuestionDto: CreateQuestionDto): Promise<IResponse> {
    const question = await this.questionsRepository.findOne(questionId, { relations: ['user'] })
    if(question.user.id !== userId) throw new HttpException('Forbidden!', HttpStatus.FORBIDDEN)

    await this.questionsRepository.update(questionId, updateQuestionDto)
    return { success: true }
  }

  async deleteQuestion(userId: string, questionId: string): Promise<IResponse> {
    const question = await this.questionsRepository.findOne(questionId, { relations: ['user'] })
    if(question.user.id !== userId) throw new HttpException('Forbidden!', HttpStatus.FORBIDDEN)

    await this.questionsRepository.delete(question)
    return { success: true }
  }

  private getDate(date: number): string {
    const vailidDate = new Date(date)
    return `${vailidDate.getFullYear()}-${vailidDate.getMonth()}-${vailidDate.getDate()}`
  }

  private getValidLinkQuestions(questions: Question[]): ILinkQuestion[] {
    const response = questions.map((question) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { descriptions, answer, ...data } = question
      const date = this.getDate(Number(question.date))

      return { ...data, date }
    })

    return response
  }

  private filterQuestions(type: string, questions: Question[]): Question[] {
    switch (type) {
      case questionTypeEnum.new:
        return questions.sort((a, b) => a.date - b.date)

      case questionTypeEnum.popular:
        

        break
      case questionTypeEnum.withoutAnswers:
        return questions.filter((question) => question.answer.length === 0)
    }
  }

  private filterCategories(categories: string[], questions: Question[]): Question[] {
    const filteredQuestions: Question[] = []

    categories.forEach((category) => {
      const validQuestions = questions.filter((question) => {
        return question.categories.find((item) => item === category)
      })

      filteredQuestions.push(...validQuestions)
    })

    return filteredQuestions
  }

  private paginationQuestions(page: number, questions: Question[]): Question[] {
    const start = this.limit * (page - 1)
    const end = start + this.limit

    return questions.slice(start, end)
  }
}