import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import * as jwt from 'jsonwebtoken'

import { UserService } from '../user/user.service'
import { MailService } from '../mail/mail.service'

import { User } from '../user/entity/user.entity'

import { CreateUserDto } from '../user/dto/create-user.dto'
import { CheckUserDto } from '../user/dto/check-user.dto'

import { ITokens, ITokensData } from './interfaces/auth-tokens.interface'
import { IResponse } from './interfaces/response.interface'
import { statusEnum } from '../user/enums/status.enum'

@Injectable()
export class AuthService {
  private readonly accessTokenTime: number

  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
    private readonly mailService: MailService
  ) {
    this.accessTokenTime = 10 * 60 * 1000 // 10m
  }

  async register(createUserDto: CreateUserDto): Promise<IResponse> {
    const isExistsEmail = await this.userService.findByEmail(createUserDto.email)
    const isExistsName = await this.userService.findByName(createUserDto.userName)
    
    if(isExistsEmail || isExistsName) throw new HttpException('User exists', HttpStatus.BAD_REQUEST)

    const user = await this.userService.create(createUserDto)
    await this.sendConfirmation(user.id)

    return { success: true }
  }

  async login(checkUserDto: CheckUserDto): Promise<ITokens> {
    const { email, password } = checkUserDto

    const user = await this.userService.findByEmail(email)
    if(!user) throw new HttpException('Incorrect login or password!', HttpStatus.FORBIDDEN)

    const isValid = await this.userService.comparePassword(password, user.password)
    if(!isValid) throw new HttpException('Incorrect login or password!', HttpStatus.FORBIDDEN)

    return {
      userName: user.userName,
      accessToken: await this.generateAccessToken({ userId: user.id }),
      refreshToken: await this.generateRefreshToken({ userId: user.id }),
      expiresOn: Date.now() + this.accessTokenTime
    }
  }

  async updateTokens(userId: string): Promise<ITokens> {
    return {
      accessToken: await this.generateAccessToken({ userId }),
      refreshToken: await this.generateRefreshToken({ userId }),
      expiresOn: Date.now() + this.accessTokenTime
    }
  }

  async confirmAccount(token: string): Promise<IResponse> {
    await jwt.verify(token, this.configService.get<string>('JWT_CONFIRM_SECRET'), async (err, payload: ITokensData) => {
      if(err) {
        throw new HttpException('Invalid token', HttpStatus.BAD_REQUEST)
      }else {
        const user = await this.userService.findById(payload.userId)

        if(!user || user.status !== statusEnum.pending) {
          throw new HttpException('Confirmation error', HttpStatus.BAD_REQUEST)
        }

        await this.userService.update(payload.userId, { status: statusEnum.active })
      }
    })
    
    return { success: true }
  }

  async sendConfirmation(userId: string): Promise<IResponse> {
    const user = await this.userService.findById(userId)

    const tokenPayload = {
      userId: user.id,
    }

    await this.mailService.sendConfirmation({
      email: user.email,
      userName: user.userName,
      tokenPayload
    })

    return { success: true }
  }

  private async generateAccessToken(data: ITokensData, options?: jwt.SignOptions): Promise<string> {
    return jwt.sign(data, this.configService.get<string>('JWT_ACCESS_SECRET'), { expiresIn: '10m', ...options })
  }

  private async generateRefreshToken(data: ITokensData, options?: jwt.SignOptions): Promise<string> {
    return jwt.sign(data, this.configService.get<string>('JWT_REFRESH_SECRET'), { expiresIn: '24h', ...options })
  }
}