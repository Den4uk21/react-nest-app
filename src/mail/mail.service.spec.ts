import { Test, TestingModule } from '@nestjs/testing'
import { ConfigService } from '@nestjs/config'

import { MailService } from './mail.service'

import { ISendConfirmData } from './interfaces/send-confirm.interface'

describe('MailService', () => {
  let service: MailService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MailService,
        {
          provide: ConfigService,
          useValue: {
            get(key: string) {
              switch(key) {
                case 'NODEMAILER_USER':
                  return 'alanis96@ethereal.email'
                case 'NODEMAILER_PASS':
                  return 'hWXU8vCA14jeY76Syd'
                case 'JWT_CONFIRM_SECRET':
                  return 'SuperJwtConfirm'
              }
            }
          }
        },
      ],
    }).compile()

    service = module.get<MailService>(MailService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('sendConfirmation', () => {
    const mailData: ISendConfirmData = {
      email: 'test@test.com',
      userName: 'Tester',
      tokenPayload: {
        userId: '1'
      }
    }

    it('should be defined', () => {
      expect(service.sendConfirmation(mailData)).toBeDefined()
    })
  })

  describe('sendChangeEmail', () => {
    const mailData: ISendConfirmData = {
      email: 'test@test.com',
      userName: 'Tester',
      tokenPayload: {
        userId: '1'
      }
    }

    it('should be defined', () => {
      expect(service.sendChangeEmail(mailData)).toBeDefined()
    })
  })

  describe('sendChangeForgotPass', () => {
    const mailData: ISendConfirmData = {
      email: 'test@test.com',
      userName: 'Tester',
      tokenPayload: {
        userId: '1'
      }
    }

    it('should be defined', () => {
      expect(service.sendChangeForgotPass(mailData)).toBeDefined()
    })
  })
})