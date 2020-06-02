import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import * as nodemailer from 'nodemailer'
import * as jwt from 'jsonwebtoken'

import { IMailData } from './interfaces/mail.interface'
import { ISendConfirmData } from './interfaces/send-confirm.interface'

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter
  private readonly clientAppUrl: string

  constructor(private readonly configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: this.configService.get<string>('NODEMAILER_USER'),
        pass: this.configService.get<string>('NODEMAILER_PASS')
      },
      tls: {
        rejectUnauthorized: false
      }
    })

    this.clientAppUrl = this.configService.get<string>('FE_APP_URL')
  }

  async sendConfirmation(mailData: ISendConfirmData): Promise<void> {
    const { email, userName, tokenPayload } = mailData

    const confirmToken = await this.generateConfirmToken(tokenPayload)
    const confirmLink = `${this.clientAppUrl}/auth/confirm?token=${confirmToken}`

    await this.send({
      from: this.configService.get<string>('NODEMAILER_USER'),
      to: email,
      subject: 'Verify User',
      html: `
        <h3>Hello ${userName}!</h3>
        <p>Please use this <a href="${confirmLink}">link</a> to confirm your account.</p>
      `
    })
  }

  async sendChangeEmail(mailData: ISendConfirmData): Promise<void> {
    const { email, userName, tokenPayload } = mailData

    const confirmToken = await this.generateConfirmToken(tokenPayload)
    const confirmLink = `${this.clientAppUrl}/profile/change-email?token=${confirmToken}`

    await this.send({
      from: this.configService.get<string>('NODEMAILER_USER'),
      to: email,
      subject: 'Change Email',
      html: `
        <h3>Hello ${userName}!</h3>
        <p>Please use this <a href="${confirmLink}">link</a> to change your email.</p>
      `
    })
  }

  async sendChangePass(mailData: ISendConfirmData): Promise<void> {
    const { email, userName, tokenPayload } = mailData

    const confirmToken = await this.generateConfirmToken(tokenPayload)
    const confirmLink = `${this.clientAppUrl}/profile/change-password?token=${confirmToken}`

    await this.send({
      from: this.configService.get<string>('NODEMAILER_USER'),
      to: email,
      subject: 'Change Password',
      html: `
        <h3>Hello ${userName}!</h3>
        <p>Please use this <a href="${confirmLink}">link</a> to change your password.</p>
      `
    })
  }

  private send(mailOptions: IMailData): Promise<nodemailer.SentMessageInfo> {
    return new Promise((res, rej) => {
      this.transporter.sendMail(mailOptions, (err, info) => {
        if(err) rej(err)
        res(info)
      })
    })
  }

  private async generateConfirmToken(data, options?: jwt.SignOptions): Promise<string> {
    return jwt.sign(data, this.configService.get<string>('JWT_CONFIRM_SECRET'), { expiresIn: '24h', ...options })
  }
}