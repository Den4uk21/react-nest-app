import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import * as jwt from 'jsonwebtoken'
import * as bcrypt from 'bcrypt'

import { UserService } from '../user/user.service'

import { CreateUserDto } from '../user/dto/create-user.dto'
import { CheckUserDto } from '../user/dto/check-user.dto'

import { ITokens, ITokensData } from './interfaces/auth-tokens.interface'

@Injectable()
export class AuthService {
  private readonly clientAppUrl: string
  private readonly accessTokenTime: number

  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {
    this.clientAppUrl = this.configService.get<string>('FE_APP_URL')
    this.accessTokenTime = 10 * 60 * 1000 // 10m
  }

  async register(createUserDto: CreateUserDto): Promise<void> {
    const isExists = await this.userService.findByEmail(createUserDto.email)
    if(isExists) throw new HttpException('User exists', HttpStatus.BAD_REQUEST)

    await this.userService.create(createUserDto)
  }

  async login(checkUserDto: CheckUserDto): Promise<ITokens> {
    const { email, password } = checkUserDto

    const user = await this.userService.findByEmail(email)
    if(!user) throw new HttpException('Incorrect login or password', HttpStatus.FORBIDDEN)

    const isValid = await bcrypt.compare(password, user.password)
    if(!isValid) throw new HttpException('Incorrect login or password', HttpStatus.FORBIDDEN)

    return {
      accessToken: await this.generateAccessToken({ userId: user.id }),
      refreshToken: await this.generateRefreshToken({ userId: user.id }),
      expiresOn: Date.now() + this.accessTokenTime
    }
  }

  async updateTokens(userId: string): Promise<ITokens> {
    return {
      accessToken: await this.generateAccessToken({ userId: userId }),
      refreshToken: await this.generateRefreshToken({ userId: userId }),
      expiresOn: Date.now() + this.accessTokenTime
    }
  }

  private async generateAccessToken(data: ITokensData, options?: jwt.SignOptions): Promise<string> {
    return jwt.sign(data, this.configService.get<string>('JWT_ACCESS_SECRET'), { expiresIn: '10m', ...options })
  }

  private async generateRefreshToken(data: ITokensData, options?: jwt.SignOptions): Promise<string> {
    return jwt.sign(data, this.configService.get<string>('JWT_REFRESH_SECRET'), { expiresIn: '24h', ...options })
  }

  private async generateConfirmToken(data, options?: jwt.SignOptions): Promise<string> {
    return jwt.sign(data, this.configService.get<string>('JWT_CONFIRM_SECRET'), { expiresIn: '24h', ...options })
  }
}