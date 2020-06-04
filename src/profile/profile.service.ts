import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import * as jwt from 'jsonwebtoken'

import { UserService } from '../user/user.service'
import { MailService } from '../mail/mail.service'

import { UpdateProfileDto } from './dto/update-profile.dto'
import { EmailProfileDto } from './dto/email-profile.dto'
import { ChangePassDto } from './dto/change-pass.dto'

import { IGetProfile } from './interfaces/get-profile.interface'
import { ITokensData } from '../auth/interfaces/auth-tokens.interface'
import { IResponse } from '../auth/interfaces/response.interface'

@Injectable()
export class ProfileService {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
    private readonly mailService: MailService
  ) {}

  async getProfile(userName: string): Promise<IGetProfile> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, password, avatarId, ...profile } = await this.userService.findByName(userName)
    
    return { avatarUrl: this.userService.getAvatar(avatarId), ...profile }
  }

  async updateProfile(userId: string, updateProfileDto: UpdateProfileDto): Promise<IResponse> {
    const isValidUser = await this.userService.findByName(updateProfileDto.userName)
    if(isValidUser && userId !== isValidUser.id) throw new HttpException('Name is busy', HttpStatus.BAD_REQUEST)

    await this.userService.update(userId, updateProfileDto)
    return { success: true }
  }

  async changeEmail(token: string, changeEmailDto: EmailProfileDto): Promise<IResponse> {
    await jwt.verify(token, this.configService.get<string>('JWT_CONFIRM_SECRET'), async (err, payload: ITokensData) => {
      if(err) {
        throw new HttpException('Invalid token', HttpStatus.BAD_REQUEST)
      }else {
        await this.userService.update(payload.userId, changeEmailDto)
      }
    })

    return { success: true }
  }

  async sendChangeEmail(userId: string): Promise<IResponse> {
    const user = await this.userService.findById(userId)
    const tokenPayload = { userId: user.id }

    await this.mailService.sendChangeEmail({
      email: user.email,
      userName: user.userName,
      tokenPayload
    })

    return { success: true }
  }

  async changePassword(token: string, changePassDto: ChangePassDto): Promise<IResponse> {
    await jwt.verify(token, this.configService.get<string>('JWT_CONFIRM_SECRET'), async (err, payload: ITokensData) => {
      if(err) {
        throw new HttpException('Invalid token', HttpStatus.BAD_REQUEST)
      }else {
        const hash = await this.userService.hashPassword(changePassDto.password)
        await this.userService.update(payload.userId, { password: hash })
      }
    })

    return { success: true }
  }

  async sendChangePass(email: string): Promise<IResponse> {
    const user = await this.userService.findByEmail(email)
    if(!user) throw new HttpException('Email not found!', HttpStatus.NOT_FOUND)

    const tokenPayload = { userId: user.id }

    await this.mailService.sendChangePass({
      email: user.email,
      userName: user.userName,
      tokenPayload
    })

    return { success: true }
  }
}