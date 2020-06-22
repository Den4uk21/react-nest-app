import { Controller, Post, Get, UseGuards, Body, Request, Put, Query } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { AuthGuard } from '@nestjs/passport'

import { AuthService } from './auth.service'

import { CreateUserDto } from '../user/dto/create-user.dto'
import { CheckUserDto } from '../user/dto/check-user.dto'

import { ITokens } from './interfaces/auth-tokens.interface'
import { IResponse } from './interfaces/response.interface'

@ApiTags('auth')
@ApiBearerAuth()
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto): Promise<IResponse> {
    return this.authService.register(createUserDto)
  }

  @Post('login')
  async login(@Body() checkUserDto: CheckUserDto): Promise<ITokens> {
    return this.authService.login(checkUserDto)
  }

  @UseGuards(AuthGuard('refresh-jwt'))
  @Get('update-tokens')
  async updateTokens(@Request() req): Promise<ITokens> {
    return this.authService.updateTokens(req.user.userId)
  }

  @Put('confirm')
  async confirmAccount(@Query('token') token: string): Promise<IResponse> {
    return this.authService.confirmAccount(token)
  }

  @UseGuards(AuthGuard())
  @Post('send-confirm')
  async sendConfirmation(@Request() req): Promise<IResponse> {
    return this.authService.sendConfirmation(req.user.userId)
  }
}