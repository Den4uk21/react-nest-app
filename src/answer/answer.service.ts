import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { Answer } from './entity/answer.entity'

import { UserService } from '../user/user.service'
import { QuestionService } from '../question/question.service'

import { CreateAnswerDto } from './dto/create-answer.dto'
import { UpdateAnswerDto } from './dto/update-answer.dto'

import { IResponse } from '../auth/interfaces/response.interface'
import { IGetAnswerResponse } from './interfaces/get-answers.interface'

@Injectable()
export class AnswerService {
  constructor(
    @InjectRepository(Answer)
    private answersRepository: Repository<Answer>,
    private readonly userService: UserService,
    private readonly questionService: QuestionService 
  ) {}

  async createAnswer(userId: string, questionId: string, createAnswerDto: CreateAnswerDto): Promise<IResponse> {
    const user = await this.userService.findById(userId)
    const question = await this.questionService.findById(questionId)

    if(!question) throw new HttpException('Question not found!', HttpStatus.NOT_FOUND)

    const answer = await this.answersRepository.create({ answer: createAnswerDto.answer, question, user })
    await this.answersRepository.save(answer)

    return { success: true }
  }

  async getAnswers(page: number, questionId: string): Promise<IGetAnswerResponse> {
    const question = await this.questionService.findById(questionId, { relations: ['answers'] })
    if(!question) throw new HttpException('Question not found!', HttpStatus.NOT_FOUND)

    const { answers } = question

    const confirmedAnswersList = answers.filter((answer) => answer.isAnswer === true)
    const noConfirmedAnswersList = answers.filter((answer) => answer.isAnswer === false)

    const withRatingList = noConfirmedAnswersList
      .filter((answer) => answer.rating.length > 0)
      .sort((a, b) => b.date - a.date)
      .sort((a, b) => b.rating.length - a.rating.length)

    const noRatingList = noConfirmedAnswersList
      .filter((answer) => answer.rating.length === 0)
      .sort((a, b) => b.date - a.date)

    const sortAnswers = [...confirmedAnswersList, ...withRatingList, ...noRatingList]

    const responseAnswers = await Promise.all(sortAnswers.map(async (answer) => {
      const { user } = await this.answersRepository.findOne(answer.id, { relations: ['user'] })

      return {
        ...answer,
        rating: answer.rating.length,
        userName: user.userName,
        avatarUrl: this.userService.getAvatar(user.avatarId),
        date: this.userService.getDate(answer.date)
      }
    }))

    const validAnswers = this.questionService.paginationPages(page, responseAnswers)

    return {
      answersList: validAnswers,
      amount: responseAnswers.length
    }
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
    const question = await this.questionService.findById(questionId, { relations: ['user'] })
    const answer = await this.answersRepository.findOne(answerId)

    if(user.id !== question.user.id) throw new HttpException('Forbidden!', HttpStatus.FORBIDDEN)
    await this.answersRepository.update(answerId, { isAnswer: !answer.isAnswer })

    return { success: true }
  }

  async updateRating(userId: string, answerId: string): Promise<IResponse> {
    const answer = await this.answersRepository.findOne(answerId)
    const isRated = answer.rating.find((id) => id === userId)

    if(isRated) {
      answer.rating = answer.rating.filter((id) => id !== userId)
    }else {
      answer.rating.push(userId)
    }

    await this.answersRepository.save(answer)
    return { success: true }
  }
}