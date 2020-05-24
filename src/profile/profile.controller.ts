import { Controller, Put, Request, Body, UseGuards, Post, Query, Get, Param } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger'

import { ProfileService } from './profile.service'

import { UpdateProfileDto } from './dto/update-profile.dto'
import { EmailProfileDto } from './dto/email-profile.dto'
import { ChangePassDto } from './dto/change-pass.dto'

@ApiTags('profile')
@ApiBearerAuth()
@Controller('profile')
export class ProfileController {
  constructor(
    private readonly profileService: ProfileService
  ) {}

  @Get(':user')
  async getProfile(@Param('user') userName: string) {
    return this.profileService.getProfile(userName)
  }

  @UseGuards(AuthGuard())
  @Put('update')
  async updateProfile(@Request() req, @Body() updateProfileDto: UpdateProfileDto): Promise<void> {
    await this.profileService.updateProfile(req.user.userId, updateProfileDto)
  }

  @Put('change-email')
  async changeEmail(@Query('token') token: string, @Body() changeEmailDto: EmailProfileDto): Promise<void> {
    await this.profileService.changeEmail(token, changeEmailDto)
  }

  @UseGuards(AuthGuard())
  @Post('send-change-email')
  async sendChangeEmail(@Request() req): Promise<void> {
    await this.profileService.sendChangeEmail(req.user.userId)
  }

  @UseGuards()
  @Put('change-password')
  async changePassword(@Query('token') token: string, @Body() changePassDto: ChangePassDto): Promise<void> {
    await this.profileService.changePassword(token, changePassDto)
  }

  @Post('send-change-pass')
  async sendChangePass(@Body() changeEmailDto: EmailProfileDto): Promise<void> {
    await this.profileService.sendChangePass(changeEmailDto.email)
  }
}