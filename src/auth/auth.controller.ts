import { Controller, Post, Get, UseGuards, Body, Request } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { AuthGuard } from '@nestjs/passport'

import { AuthService } from './auth.service'

import { CreateUserDto } from '../user/dto/create-user.dto'
import { CheckUserDto } from '../user/dto/check-user.dto'

import { ITokens } from './interfaces/auth-tokens.interface'

@ApiTags('auth')
@ApiBearerAuth()
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) {}

  @Post('register')
  async signUp(@Body() createUserDto: CreateUserDto): Promise<void> {
    await this.authService.register(createUserDto)
  }

  @Post('login')
  async signIn(@Body() checkUserDto: CheckUserDto): Promise<ITokens> {
    return this.authService.login(checkUserDto)
  }

  @Get('update-tokens')
  @UseGuards(AuthGuard('refresh-jwt'))
  async updateTokens(@Request() req): Promise<ITokens> {
    return this.authService.updateTokens(req.user.userId)
  }
}