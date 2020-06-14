import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import * as jwt from 'jsonwebtoken'

import { UserService } from '../user/user.service'
import { MailService } from '../mail/mail.service'

import { UpdateProfileDto } from './dto/update-profile.dto'
import { UpdateUsernameDto } from './dto/update-username.dto'
import { EmailProfileDto } from './dto/email-profile.dto'
import { ChangePassDto } from './dto/change-pass.dto'
import { ChangeForgotPassDto } from './dto/change-forgot-pass.dto'

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
    const user = await this.userService.findByName(userName)
    if(!user) throw new HttpException('User not Found!', HttpStatus.NOT_FOUND)

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, password, avatarId, ...profile } = user    
    return { avatarUrl: this.userService.getAvatar(avatarId, { width: 200, height: 200 }), ...profile }
  }

  async updateProfile(userId: string, updateProfileDto: UpdateProfileDto): Promise<IResponse> {
    await this.userService.update(userId, updateProfileDto)
    return { success: true }
  }

  async updateUsername(userId: string, updateUsernameDto: UpdateUsernameDto): Promise<IResponse> {
    const { userName } = updateUsernameDto

    const checkName = await this.userService.findByName(userName)
    if(checkName) throw new HttpException('User exists!', HttpStatus.FORBIDDEN)

    await this.userService.update(userId, updateUsernameDto)
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

  async changePassword(userId: string, changePassDto: ChangePassDto): Promise<IResponse> {
    const { oldPassword, newPassword } = changePassDto
    const user = await this.userService.findById(userId)

    const isValid = await this.userService.comparePassword(oldPassword, user.password)
    if(!isValid) throw new HttpException('Incorrect old password!', HttpStatus.FORBIDDEN)

    const hash = await this.userService.hashPassword(newPassword)
    await this.userService.update(userId, { password: hash })

    return { success: true }
  }

  async changeForgotPass(token: string, changeForgotPassDto: ChangeForgotPassDto): Promise<IResponse> {
    await jwt.verify(token, this.configService.get<string>('JWT_CONFIRM_SECRET'), async (err, payload: ITokensData) => {
      if(err) {
        throw new HttpException('Invalid token', HttpStatus.BAD_REQUEST)
      }else {
        const hash = await this.userService.hashPassword(changeForgotPassDto.password)
        await this.userService.update(payload.userId, { password: hash })
      }
    })

    return { success: true }
  }

  async sendChangeForgotPass(email: string): Promise<IResponse> {
    const user = await this.userService.findByEmail(email)
    if(!user) throw new HttpException('Email not found!', HttpStatus.NOT_FOUND)

    const tokenPayload = { userId: user.id }

    await this.mailService.sendChangeForgotPass({
      email: user.email,
      userName: user.userName,
      tokenPayload
    })

    return { success: true }
  }
}