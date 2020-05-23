import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import * as nodemailer from 'nodemailer'

import { IMailData } from './interfaces/mail.interface'
import { ISendConfirmData } from './interfaces/send-confirm.interface'

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter

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
  }

  async sendConfirmation(mailData: ISendConfirmData): Promise<void> {
    const { email, nickName, confirmLink } = mailData

    await this.send({
      from: this.configService.get<string>('NODEMAILER_USER'),
      to: email,
      subject: 'Verify User',
      html: `
        <h3>Hello ${nickName}!</h3>
        <p>Please use this <a href="${confirmLink}">link</a> to confirm your account.</p>
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
}