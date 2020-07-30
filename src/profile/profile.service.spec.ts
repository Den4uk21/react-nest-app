import { Test, TestingModule } from '@nestjs/testing'
import { ConfigService } from '@nestjs/config'

import { ProfileService } from './profile.service'
import { UserService } from '../user/user.service'
import { MailService } from '../mail/mail.service'

import { UpdateUsernameDto } from './dto/update-username.dto'
import { ChangePassDto } from './dto/change-pass.dto'
import { UpdateProfileDto } from './dto/update-profile.dto'

import { mockedUser } from '../../test/__mocks__/user/user.mock'

describe('ProfileService', () => {
  let service: ProfileService
  let userService: UserService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProfileService,
        ConfigService,
        {
          provide: UserService,
          useValue: {
            findByName: jest.fn(async () => mockedUser),
            getAvatar: jest.fn(() => 'avatar'),
            update: jest.fn(),
            findById: jest.fn(async () => mockedUser),
            comparePassword: jest.fn(() => true),
            hashPassword: jest.fn(() => 'hash'),
            findByEmail: jest.fn(async () => mockedUser)
          }
        },
        {
          provide: MailService,
          useValue: {
            sendChangeEmail: jest.fn(),
            sendChangeForgotPass: jest.fn()
          }
        }
      ],
    }).compile()

    service = module.get<ProfileService>(ProfileService)
    userService = module.get<UserService>(UserService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('getProfile', () => {
    const params = {
      userName: 'Tester'
    }

    it('should return user profile', async () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { id, password, avatarId, ...profile } = mockedUser
      const result = { ...profile, avatarUrl: 'avatar' }

      expect(await service.getProfile(params.userName)).toEqual(result)
    })
    it('should return that the user was not found', async () => {
      jest.spyOn(userService, 'findByName').mockImplementation(async () => null)

      const result = {
        response: 'User not Found!',
        status: 404
      }
      
      try {
        await service.getProfile(params.userName)
      }catch(err) {
        expect(err.response).toBe(result.response)
        expect(err.status).toBe(result.status)
      }
    })
  })

  describe('updateProfile', () => {
    const params = {
      userId: '1'
    }
    const updateProfileDto: UpdateProfileDto = {
      bio: 'Some bio',
      motto: 'Some motto'
    }

    it('should return { success: true }', async () => {
      const result = { success: true }

      expect(await service.updateProfile(params.userId, updateProfileDto)).toEqual(result)
    })
  })

  describe('updateUsername', () => {
    const params = {
      userId: '1'
    }
    const updateUsernameDto: UpdateUsernameDto = { userName: 'New Tester' }

    it('should return { success: true }', async () => {
      jest.spyOn(userService, 'findByName').mockImplementation(async () => null)

      const result = { success: true }
      expect(await service.updateUsername(params.userId, updateUsernameDto)).toEqual(result)
    })
    it('should return that the user was not found', async () => {
      const result = {
        response: 'User exists!',
        status: 403
      }
      
      try {
        await service.updateUsername(params.userId, updateUsernameDto)
      }catch(err) {
        expect(err.response).toBe(result.response)
        expect(err.status).toBe(result.status)
      }
    })
  })

  describe('sendChangeEmail', () => {
    const params = {
      userId: '1'
    }

    it('should return { success: true }', async () => {
      const result = { success: true }
      expect(await service.sendChangeEmail(params.userId)).toEqual(result)
    })
  })

  describe('changePassword', () => {
    const params = {
      userId: '1'
    }
    const changePassDto: ChangePassDto = {
      oldPassword: '123test123',
      newPassword: 'tester123'
    }

    it('should return { success: true }', async () => {
      const result = { success: true }
      expect(await service.changePassword(params.userId, changePassDto)).toEqual(result)
    })
    it('should return that the old password is incorrect', async () => {
      jest.spyOn(userService, 'comparePassword').mockImplementation(async () => false)

      const result = {
        response: 'Incorrect old password!',
        status: 403
      }
      
      try {
        await service.changePassword(params.userId, changePassDto)
      }catch(err) {
        expect(err.response).toBe(result.response)
        expect(err.status).toBe(result.status)
      }
    })
  })

  describe('sendChangeForgotPass', () => {
    const params = {
      email: 'test@test.com'
    }

    it('should return { success: true }', async () => {
      const result = { success: true }
      expect(await service.sendChangeForgotPass(params.email)).toEqual(result)
    })
    it('should return that email not found', async () => {
      jest.spyOn(userService, 'findByEmail').mockImplementation(async () => null)

      const result = {
        response: 'Email not found!',
        status: 404
      }
      
      try {
        await service.sendChangeForgotPass(params.email)
      }catch(err) {
        expect(err.response).toBe(result.response)
        expect(err.status).toBe(result.status)
      }
    })
  })
})