import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { ConfigService } from '@nestjs/config'
import { Repository } from 'typeorm'

import { UserService } from './user.service'

import { User } from './entity/user.entity'

import { CreateUserDto } from './dto/create-user.dto'

import { mockedUser } from '../../test/__mocks__/user/user.mock'

describe('UserService', () => {
  let service: UserService
  let repository: Repository<User>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        ConfigService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            create: jest.fn(() => new User()),
            save: jest.fn(),
            findOne: jest.fn(async () => mockedUser)
          }
        }
      ],
    }).compile()

    service = module.get<UserService>(UserService)
    repository = module.get<Repository<User>>(getRepositoryToken(User))
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('create', () => {
    const createUserDto: CreateUserDto = {
      userName: 'Tester',
      email: 'test@test.com',
      password: '123test123'
    }

    it('should return the user object', async () => {
      const validMockedUser = {
        ...mockedUser,
        status: 'pending',
        bio: null,
        motto: null,
        answers: [],
        questions: []
      }

      jest.spyOn(repository, 'create').mockImplementation(() => validMockedUser)

      expect(await service.create(createUserDto)).toEqual(validMockedUser)
    })
  })

  describe('findById', () => {
    const params = {
      id: '1'
    }

    it('should return the user object', async () => {
      expect(await service.findById(params.id)).toEqual(mockedUser)
    })
  })

  describe('findByEmail', () => {
    const params = {
      email: 'test@test.com'
    }

    it('should return the user object', async () => {
      expect(await service.findByEmail(params.email)).toEqual(mockedUser)
    })
  })

  describe('findByName', () => {
    const params = {
      userName: 'Tester'
    }

    it('should return the user object', async () => {
      expect(await service.findByName(params.userName)).toEqual(mockedUser)
    })
  })

  describe('getDate', () => {
    const params = {
      date: 1595771471081
    }

    it('should return a clear date', () => {
      const result = '2020-7-26'
      expect(service.getDate(params.date)).toBe(result)
    })
  })
})