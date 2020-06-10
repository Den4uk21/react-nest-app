import { Controller, Request, Post, Body, UseGuards, Get, Param, Delete, Put, Query } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger'

import { QuestionService } from './question.service'

import { CreateQuestionDto } from './dto/create-question.dto'
import { FilterQuestionDto } from './dto/filter-question.dto'

import { ILinkQuestionResponse } from './interfaces/link-question.interface'
import { IGetQuestion } from './interfaces/get-question.interface'
import { IResponse } from '../auth/interfaces/response.interface'

@ApiTags('question')
@ApiBearerAuth()
@Controller('questions')
export class QuestionController {
  constructor(
    private readonly questionService: QuestionService,
  ) {}

  @UseGuards(AuthGuard())
  @Post('new')
  async createQuestion(@Request() req, @Body() createQuestionDto: CreateQuestionDto): Promise<IResponse> {
    return this.questionService.createQuestion(req.user.userId, createQuestionDto)
  }

  @Get(':user/no-answers')
  async getUserQuestionsNoAnswers(@Param('user') userName: string, @Query('page') page: number): Promise<ILinkQuestionResponse> {
    return this.questionService.getUserQuestionsNoAnswers(userName, page)
  }

  @Get(':user/with-answers')
  async getUserQuestionsWithAnswers(@Param('user') userName: string, @Query('page') page: number): Promise<ILinkQuestionResponse> {
    return this.questionService.getUserQuestionsWithAnswers(userName, page)
  }

  @Post('all')
  async getAllQuestions(@Query('page') page: number, @Body() filterQuestionDto: FilterQuestionDto): Promise<ILinkQuestionResponse> {
    return this.questionService.getAllQuestions(page, filterQuestionDto)
  }

  @Get(':questionId')
  async getQuestion(@Param('questionId') questionId: string): Promise<IGetQuestion> {
    return this.questionService.getQuestion(questionId)
  }

  @UseGuards(AuthGuard())
  @Put(':questionId')
  async updateQuestion(@Request() req, @Param('questionId') questionId: string, @Body() updateQuestionDto: CreateQuestionDto): Promise<IResponse> {
    return this.questionService.updateQuestion(req.user.userId, questionId, updateQuestionDto)
  }

  @UseGuards(AuthGuard())
  @Delete(':questionId')
  async deleteQuestion(@Request() req, @Param('questionId') questionId: string): Promise<IResponse> {
    return this.questionService.deleteQuestion(req.user.userId, questionId)
  }
}