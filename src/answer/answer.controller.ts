import { Controller, UseGuards, Get, Post, Put, Delete, Request, Param, Body, Query } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger'

import { AnswerService } from './answer.service'

import { CreateAnswerDto } from './dto/create-answer.dto'
import { UpdateAnswerDto } from './dto/update-answer.dto'

import { IResponse } from '../auth/interfaces/response.interface'
import { IGetAnswerResponse } from './interfaces/get-answers.interface'

@ApiTags('answer')
@ApiBearerAuth()
@Controller('answers')
export class AnswerController {
  constructor(
    private readonly answerService: AnswerService
  ) {}

  @UseGuards(AuthGuard())
  @Post('new')
  async createAnswer(@Request() req, @Body() createAnswerDto: CreateAnswerDto): Promise<IResponse> {
    return this.answerService.createAnswer(req.user.userId, createAnswerDto)
  }

  @Get(':questionId')
  async getAnswers(@Param('questionId') questionId: string, @Query('page') page: number): Promise<IGetAnswerResponse> {
    return this.answerService.getAnswers(page, questionId)
  }

  @UseGuards(AuthGuard())
  @Put(':answerId')
  async updateAnswer(@Request() req, @Param('answerId') answerId: string, @Body() updateAnswerDto: UpdateAnswerDto): Promise<IResponse> {
    return this.answerService.updateAnswer(req.user.userId, answerId, updateAnswerDto)
  }

  @UseGuards(AuthGuard())
  @Delete(':answerId')
  async deleteAnswer(@Request() req, @Param('answerId') answerId: string): Promise<IResponse> {
    return this.answerService.deleteAnswer(req.user.userId, answerId)
  }

  @UseGuards(AuthGuard())
  @Put(':questionId/is-answer/:answerId')
  async isAnswer(@Request() req, @Param('questionId') questionId: string, @Param('answerId') answerId: string): Promise<IResponse> {
    return this.answerService.isAnswer(req.user.userId, questionId, answerId)
  }

  @UseGuards(AuthGuard())
  @Put('update-rating/:answerId')
  async updateRating(@Request() req, @Param('answerId') answerId: string): Promise<IResponse> {
    return this.answerService.updateRating(req.user.userId, answerId)
  }
}