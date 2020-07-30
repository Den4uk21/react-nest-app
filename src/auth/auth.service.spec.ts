import { Test, TestingModule } from '@nestjs/testing'
import { ConfigService } from '@nestjs/config'

import { AuthService } from './auth.service'
import { UserService } from '../user/user.service'
import { MailService } from '../mail/mail.service'

import { CreateUserDto } from '../user/dto/create-user.dto'
import { CheckUserDto } from '../user/dto/check-user.dto'

import { mockedUser } from '../../test/__mocks__/user/user.mock'

describe('AuthService', () => {
  let service: AuthService
  let userService: UserService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: ConfigService,
          useValue: {
            get(key: string) {
              switch(key) {
                case 'JWT_ACCESS_SECRET':
                  return 'SuperJwtAccess'
                case 'JWT_REFRESH_SECRET':
                  return 'SuperJwtRefresh'
              }
            }
          }
        },
        {
          provide: UserService,
          useValue: {
            findByName: jest.fn(async () => mockedUser),
            findByEmail: jest.fn(async () => mockedUser),
            findById: jest.fn(async () => mockedUser),
            create: jest.fn(async () => mockedUser),
            comparePassword: jest.fn(() => true)
          }
        },
        {
          provide: MailService,
          useValue: {
            sendConfirmation: jest.fn()
          }
        }
      ],
    }).compile()

    service = module.get<AuthService>(AuthService)
    userService = module.get<UserService>(UserService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('register', () => {
    const createUserDto: CreateUserDto = {
      userName: 'Tester',
      email: 'test@test.com',
      password: '123test123'
    }

    it('should return {success: true}', async () => {
      jest.spyOn(userService, 'findByName').mockImplementation(() => null)
      jest.spyOn(userService, 'findByEmail').mockImplementation(() => null)

      const result = { success: true }
      expect(await service.register(createUserDto)).toEqual(result)
    })
    it('should return an error that the user exists', async () => {
      const result = {
        response: 'User exists',
        status: 400
      }

      try {
        await service.register(createUserDto)
      }catch(err) {
        expect(err.response).toBe(result.response)
        expect(err.status).toBe(result.status)
      }
    })
  })

  describe('login', () => {
    const checkUserDto: CheckUserDto = {
      email: 'test@test.com',
      password: '123test123'
    }

    it('should return types of jwt tokens, userName and expiresOn', async () => {
      const response = await service.login(checkUserDto)

      expect(typeof await response.userName).toEqual('string')
      expect(typeof await response.accessToken).toEqual('string')
      expect(typeof await response.refreshToken).toEqual('string')
      expect(typeof await response.expiresOn).toEqual('number')
    })

    describe('should return an error that the incorrect login or password', () => {
      it('via a non-existent email', async () => {
        jest.spyOn(userService, 'findByEmail').mockImplementation(async () => null)
  
        const result = {
          response: 'Incorrect login or password!',
          status: 403
        }

        try {
          await service.login(checkUserDto)
        }catch(err) {
          expect(err.response).toBe(result.response)
          expect(err.status).toBe(result.status)
        }
      })
      it('via a incorrect password', async () => {
        jest.spyOn(userService, 'comparePassword').mockImplementation(async () => false)
  
        const result = {
          response: 'Incorrect login or password!',
          status: 403
        }

        try {
          await service.login(checkUserDto)
        }catch(err) {
          expect(err.response).toBe(result.response)
          expect(err.status).toBe(result.status)
        }
      })
    })
  })

  describe('updateTokens', () => {
    const params = {
      userId: '1'
    }

    it('should return types of jwt tokens and expiresOn', async () => {
      const response = await service.updateTokens(params.userId)

      expect(typeof await response.accessToken).toEqual('string')
      expect(typeof await response.refreshToken).toEqual('string')
      expect(typeof await response.expiresOn).toEqual('number')
    })
  })

  describe('sendConfirmation', () => {
    const params = {
      userId: '1'
    }

    it('should return { success: true }', async () => {
      const result = { success: true }
      
      expect(await service.sendConfirmation(params.userId)).toEqual(result)
    })
  })
})