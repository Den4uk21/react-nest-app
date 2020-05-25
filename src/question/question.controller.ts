import { Controller, Request, Post, Body, UseGuards, Get, Param, Delete, Put } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger'

import { QuestionService } from './question.service'

import { Question } from './entity/question.entity'

import { CreateQuestionDto } from './dto/create-question.dto'

import { ILinkQuestion } from './interfaces/link-question.interface'
import { IGetQuestion } from './interfaces/get-question.interface'

@ApiTags('question')
@ApiBearerAuth()
@Controller('questions')
export class QuestionController {
  constructor(
    private readonly questionService: QuestionService
  ) {}

  @UseGuards(AuthGuard())
  @Post('new')
  async createQuestion(@Request() req, @Body() createQuestionDto: CreateQuestionDto): Promise<void> {
    await this.questionService.createQuestion(req.user.userId, createQuestionDto)
  }

  @UseGuards(AuthGuard())
  @Get('user')
  async getUserQuestions(@Request() req): Promise<Question[]> {
    return this.questionService.getUserQuestions(req.user.userId)
  }

  @Get('all')
  async getAllQuestions(): Promise<ILinkQuestion[]> {
    return this.questionService.getAllQuestions()
  }

  @Get(':questionId')
  async getQuestion(@Param('questionId') questionId: string): Promise<IGetQuestion> {
    return this.questionService.getQuestion(questionId)
  }

  @UseGuards(AuthGuard())
  @Put(':questionId')
  async updateQuestion(@Request() req, @Param('questionId') questionId: string, @Body() updateQuestionDto: CreateQuestionDto): Promise<void> {
    await this.questionService.updateQuestion(req.user.userId, questionId, updateQuestionDto)
  }

  @UseGuards(AuthGuard())
  @Delete(':questionId')
  async deleteQuestion(@Request() req, @Param('questionId') questionId: string): Promise<void> {
    await this.questionService.deleteQuestion(req.user.userId, questionId)
  }
}