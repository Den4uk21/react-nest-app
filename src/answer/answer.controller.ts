import { Controller, UseGuards, Get, Post, Put, Delete, Request, Param, Body } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger'

import { AnswerService } from './answer.service'

import { Answer } from './entity/answer.entity'

import { CreateAnswerDto } from './dto/create-answer.dto'
import { UpdateAnswerDto } from './dto/update-answer.dto'

@ApiTags('answer')
@ApiBearerAuth()
@Controller('answers')
export class AnswerController {
  constructor(
    private readonly answerService: AnswerService
  ) {}

  @UseGuards(AuthGuard())
  @Post('new')
  async createAnswer(@Request() req, @Body() createAnswerDto: CreateAnswerDto): Promise<void> {
    await this.answerService.createAnswer(req.user.userId, createAnswerDto)
  }

  @Get(':questionId')
  async getAnswers(@Param('questionId') questionId: string): Promise<Answer[]> {
    return this.answerService.getAnswers(questionId)
  }

  @UseGuards(AuthGuard())
  @Put(':answerId')
  async updateAnswer(@Request() req, @Param('answerId') answerId: string, @Body() updateAnswerDto: UpdateAnswerDto): Promise<void> {
    await this.answerService.updateAnswer(req.user.userId, answerId, updateAnswerDto)
  }

  @UseGuards(AuthGuard())
  @Delete(':answerId')
  async deleteAnswer(@Request() req, @Param('answerId') answerId: string): Promise<void> {
    await this.answerService.deleteAnswer(req.user.userId, answerId)
  }

  @UseGuards(AuthGuard())
  @Post(':questionId/is-answer/:answerId')
  async isAnswer(@Request() req, @Param('questionId') questionId: string, @Param('answerId') answerId: string): Promise<void> {
    await this.answerService.isAnswer(req.user.userId, questionId, answerId)
  }
}