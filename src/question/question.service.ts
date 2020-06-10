import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, FindOneOptions } from 'typeorm'

import { UserService } from '../user/user.service'

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
  ) {
    this.limit = 10
  }

  async createQuestion(userId: string, createQuestionDto: CreateQuestionDto): Promise<IResponse> {
    const user = await this.userService.findById(userId)

    const question = await this.questionsRepository.create({ ...createQuestionDto, user })
    await this.questionsRepository.save(question)

    return { success: true }
  }

  async getUserQuestionsNoAnswers(userName: string, page: number): Promise<ILinkQuestionResponse> {
    const user = await this.userService.findByName(userName)
    if(!user) throw new HttpException('User not Found!', HttpStatus.NOT_FOUND)
    
    const questions = await this.questionsRepository.find({ where: { user: user.id }, relations: ['answers'] })
    const filteredQuestions = questions.filter((question) => question.answers.length === 0)

    const validQuestions = this.paginationPages(page, filteredQuestions)
    return {
      questionsList: this.getValidLinkQuestions(validQuestions),
      amount: filteredQuestions.length
    }
  }

  async getUserQuestionsWithAnswers(userName: string, page: number): Promise<ILinkQuestionResponse> {
    const user = await this.userService.findByName(userName)
    if(!user) throw new HttpException('User not Found!', HttpStatus.NOT_FOUND)

    const questions = await this.questionsRepository.find({ where: { user: user.id }, relations: ['answers'] })
    const filteredQuestions = questions.filter((question) => question.answers.length !== 0)

    const validQuestions = this.paginationPages(page, filteredQuestions)
    return {
      questionsList: this.getValidLinkQuestions(validQuestions),
      amount: filteredQuestions.length
    }
  }

  async getAllQuestions(page: number, filterQuestionDto: FilterQuestionDto): Promise<ILinkQuestionResponse> {
    const { type, categories } = filterQuestionDto
    
    const questions = await this.questionsRepository.find({ relations: ['answers'] })
    let filteredCategoriesQuestions: Question[] = questions

    if(categories) {
      filteredCategoriesQuestions = this.filterCategories(categories, questions)
    }
    
    const filteredQuestions = this.filterQuestions(type, filteredCategoriesQuestions)
    const validQuestions = this.paginationPages(page, filteredQuestions)

    return {
      questionsList: this.getValidLinkQuestions(validQuestions),
      amount: filteredQuestions.length
    }
  }

  async getQuestion(questionId: string): Promise<IGetQuestion> {
    const { user, ...question } = await this.questionsRepository.findOne(questionId, { relations: ['user'] })
    if(!question) throw new HttpException('Question not found!', HttpStatus.NOT_FOUND)

    const date = this.userService.getDate(Number(question.date))

    return {
      ...question,
      date,
      userName: user.userName,
      avatarUrl: this.userService.getAvatar(user.avatarId)
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

  async findById(questionId: string, options?: FindOneOptions<Question>): Promise<Question> {
    return this.questionsRepository.findOne(questionId, options)
  }

  paginationPages<T>(page: number, array: T[]): T[] {
    const start = this.limit * (page - 1)
    const end = start + this.limit

    return array.slice(start, end)
  }

  private getValidLinkQuestions(questions: Question[]): ILinkQuestion[] {
    const response = questions.map((question) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { descriptions, answers, ...data } = question
      const date = this.userService.getDate(question.date)

      return { 
        ...data, 
        date, 
        answersAmount: answers.length,
      }
    })

    return response
  }

  private filterQuestions(type: string, questions: Question[]): Question[] {
    switch (type) {
      case questionTypeEnum.new:
        return questions.sort((a, b) => b.date - a.date)

      case questionTypeEnum.popular:
        return questions.sort((a, b) => b.answers.length - a.answers.length)

      case questionTypeEnum.withoutAnswers:
        return questions.filter((question) => question.answers.length === 0)
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
}