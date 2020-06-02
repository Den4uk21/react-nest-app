/* eslint-disable @typescript-eslint/camelcase */
import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import * as jwt from 'jsonwebtoken'
import * as fs from 'fs'
import * as cloudinary from 'cloudinary'

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
  ) {
    cloudinary.v2.config ({ 
      cloud_name : 'dh4k4jylq' , 
      api_key : this.configService.get<string>('CLOUDINARY_API_KEY'), 
      api_secret : this.configService.get<string>('CLOUDINARY_API_SECRET')  
   })
  }

  async getProfile(userName: string): Promise<IGetProfile> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, password, avatarId, ...profile } = await this.userService.findByName(userName)
    
    return { avatarUrl: this.getAvatar(avatarId), ...profile }
  }

  async updateProfile(userId: string, updateProfileDto: UpdateProfileDto): Promise<IResponse> {
    const isValidUser = await this.userService.findByName(updateProfileDto.userName)
    if(isValidUser && userId !== isValidUser.id) throw new HttpException('Name is busy', HttpStatus.BAD_REQUEST)

    await this.userService.update(userId, updateProfileDto)
    return { success: true }
  }

  async uploadAvatar(userId: string, file: string): Promise<IResponse> {
    const user = await this.userService.findById(userId)
    if(user.avatarId) {
      cloudinary.v2.uploader.destroy(user.avatarId)
    }
    
    cloudinary.v2.uploader.upload(file, {
        image_metadata: false,
        folder: 'avatars'
      }, async (err, res) => {
      if(err) throw new HttpException(err, HttpStatus.BAD_REQUEST)
        
      await this.userService.update(userId, { avatarId: res.public_id })
    })

    fs.unlink(file, (err) => {
      console.log(err)
    })

    return { success: true }
  }

  getAvatar(avatarId: string, options?): string {
    return cloudinary.v2.url(avatarId, { ...options, width: 100, height: 100, crop: 'scale', secure: true, radius: 20 })
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