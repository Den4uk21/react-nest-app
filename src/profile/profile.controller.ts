import { Controller, Put, Request, Body, UseGuards, Post, Query, Get, Param, UseInterceptors, UploadedFile } from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { AuthGuard } from '@nestjs/passport'
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger'

import { ProfileService } from './profile.service'
import { UserService } from '../user/user.service'

import { UpdateProfileDto } from './dto/update-profile.dto'
import { UpdateUsernameDto } from './dto/update-username.dto'
import { EmailProfileDto } from './dto/email-profile.dto'
import { ChangeForgotPassDto } from './dto/change-forgot-pass.dto'

import { IGetProfile } from './interfaces/get-profile.interface'
import { IResponse } from '../auth/interfaces/response.interface'
import { ChangePassDto } from './dto/change-pass.dto'

@ApiTags('profile')
@ApiBearerAuth()
@Controller('profile')
export class ProfileController {
  constructor(
    private readonly profileService: ProfileService,
    private readonly userService: UserService
  ) {}

  @Get(':user')
  async getProfile(@Param('user') userName: string): Promise<IGetProfile> {
    return this.profileService.getProfile(userName)
  }

  @UseGuards(AuthGuard())
  @Put('update')
  async updateProfile(@Request() req, @Body() updateProfileDto: UpdateProfileDto): Promise<IResponse> {
    return this.profileService.updateProfile(req.user.userId, updateProfileDto)
  }

  @UseGuards(AuthGuard())
  @Post('avatar')
  @UseInterceptors(FileInterceptor('avatar', { dest: './src/user/avatars' }))
  async uploadAvatar(@UploadedFile() file, @Request() req): Promise<IResponse> {
    return this.userService.uploadAvatar(req.user.userId, file.path)
  }

  @UseGuards(AuthGuard())
  @Put('update-username')
  async updateUsername(@Request() req, @Body() updateUsernameDto: UpdateUsernameDto): Promise<IResponse> {
    return this.profileService.updateUsername(req.user.userId, updateUsernameDto)
  }

  @Put('change-email')
  async changeEmail(@Query('token') token: string, @Body() changeEmailDto: EmailProfileDto): Promise<IResponse> {
    return this.profileService.changeEmail(token, changeEmailDto)
  }

  @UseGuards(AuthGuard())
  @Post('send-change-email')
  async sendChangeEmail(@Request() req): Promise<IResponse> {
    return this.profileService.sendChangeEmail(req.user.userId)
  }

  @UseGuards(AuthGuard())
  @Put('change-password')
  async changePassword(@Request() req, @Body() changePassDto: ChangePassDto): Promise<IResponse> {
    return this.profileService.changePassword(req.user.userId, changePassDto)
  }

  @Put('change-forgot-pass')
  async changeForgotPass(@Query('token') token: string, @Body() changeForgotPassDto: ChangeForgotPassDto): Promise<IResponse> {
    return this.profileService.changeForgotPass(token, changeForgotPassDto)
  }

  @Post('send-change-pass')
  async sendChangePass(@Body() changeEmailDto: EmailProfileDto): Promise<IResponse> {
    return this.profileService.sendChangeForgotPass(changeEmailDto.email)
  }
}