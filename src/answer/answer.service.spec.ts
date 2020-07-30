import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { AnswerService } from './answer.service'
import { UserService } from '../user/user.service'
import { QuestionService } from '../question/question.service'

import { Answer } from './entity/answer.entity'

import { CreateAnswerDto } from './dto/create-answer.dto'
import { UpdateAnswerDto } from './dto/update-answer.dto'

import { mockedQuestion } from '../../test/__mocks__/question/question.mock'
import { mockedAnswer } from '../../test/__mocks__/answer/answer.mock'
import { mockedUser } from '../../test/__mocks__/user/user.mock'

describe('AnswerService', () => {
  let service: AnswerService
  let questionService: QuestionService
  let userService: UserService
  let repository: Repository<Answer>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AnswerService,
        {
          provide: getRepositoryToken(Answer),
          useValue: {
            create: jest.fn(async () => mockedAnswer),
            save: jest.fn(),
            findOne: jest.fn(async () => mockedAnswer),
            update: jest.fn(async () => mockedAnswer),
            delete: jest.fn()
          }
        },
        {
          provide: UserService,
          useValue: {
            findById: jest.fn(async () => mockedUser),
            getAvatar: jest.fn(() => 'avatar'),
            getDate: jest.fn(() => 'date')
          }
        },
        {
          provide: QuestionService,
          useValue: {
            findById: jest.fn(async () => mockedQuestion),
            paginationPages: jest.fn(() => [mockedAnswer])
          }
        }
      ],
    }).compile()

    service = module.get<AnswerService>(AnswerService)
    questionService = module.get<QuestionService>(QuestionService)
    userService = module.get<UserService>(UserService)
    repository = module.get<Repository<Answer>>(getRepositoryToken(Answer))
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('createAnswer', () => {
    const params = {
      userId: '1',
      questionId: '1'
    }
    const createAnswerDto: CreateAnswerDto = { answer: 'test' }

    it('should return { success: true }', async () => {
      const result = { success: true }
      expect(await service.createAnswer(params.userId, params.questionId, createAnswerDto)).toEqual(result)
    })
    it('should return the error that the question was not found', async () => {
      jest.spyOn(questionService, 'findById').mockImplementation(async () => null)

      const result = {
        response: 'Question not found!',
        status: 404
      }
      
      try {
        await service.createAnswer(params.userId, params.questionId, createAnswerDto)
      }catch(err) {
        expect(err.response).toBe(result.response)
        expect(err.status).toBe(result.status)
      }
    })
  })

  describe('getAnswers', () => {
    const params = {
      page: 1,
      questionId: '1'
    }

    it('should return answersList and amount', async () => {
      const result = {
        answersList: [mockedAnswer],
        amount: 1
      }

      expect(await service.getAnswers(params.page, params.questionId)).toEqual(result)
    })
    it('should return an empty answersList', async () => {
      jest.spyOn(questionService, 'paginationPages').mockImplementation(() => [])

      const newParams = { ...params, page: 2 }
      const result = {
        answersList: [],
        amount: 1
      }

      expect(await service.getAnswers(newParams.page, newParams.questionId)).toEqual(result)
    })
    it('should return the error that the question was not found', async () => {
      jest.spyOn(questionService, 'findById').mockImplementation(async () => null)

      const result = {
        response: 'Question not found!',
        status: 404
      }
      
      try {
        await service.getAnswers(params.page, params.questionId)
      }catch(err) {
        expect(err.response).toBe(result.response)
        expect(err.status).toBe(result.status)
      }
    })
  })

  describe('updateAnswer', () => {
    const params = {
      userId: '1',
      answerId: '1'
    }
    const updateAnswerDto: UpdateAnswerDto = { answer: 'new test' }

    it('should return { success: true }', async () => {
      const result = { success: true }

      expect(await service.updateAnswer(params.userId, params.answerId, updateAnswerDto)).toEqual(result)
    })
    it('should return error that access is forbidden', async () => {
      const anotherMockedAnswer = { ...mockedAnswer, user: { ...mockedUser, id: '2' } }
      jest.spyOn(repository, 'findOne').mockImplementation(async () => anotherMockedAnswer)

      const result = {
        response: 'Forbidden!',
        status: 403
      }
      
      try {
        await service.updateAnswer(params.userId, params.answerId, updateAnswerDto)
      }catch(err) {
        expect(err.response).toBe(result.response)
        expect(err.status).toBe(result.status)
      }
    })
  })

  describe('deleteAnswer', () => {
    const params = {
      userId: '1',
      answerId: '1'
    }

    it('should return { success: true }', async () => {
      const result = { success: true }

      expect(await service.deleteAnswer(params.userId, params.answerId)).toEqual(result)
    })
    it('should return error that access is forbidden', async () => {
      const anotherMockedAnswer = { ...mockedAnswer, user: { ...mockedUser, id: '2' } }
      jest.spyOn(repository, 'findOne').mockImplementation(async () => anotherMockedAnswer)

      const result = {
        response: 'Forbidden!',
        status: 403
      }
      
      try {
        await service.deleteAnswer(params.userId, params.answerId)
      }catch(err) {
        expect(err.response).toBe(result.response)
        expect(err.status).toBe(result.status)
      }
    })
  })

  describe('isAnswer', () => {
    const params = {
      userId: '1',
      questionId: '1',
      answerId: '1'
    }

    it('should return { success: true }', async () => {
      const result = { success: true }

      expect(await service.isAnswer(params.userId, params.questionId, params.answerId)).toEqual(result)
    })

    describe('should return error that access is forbidden', () => {
      it('through another user', async () => {
        const anotherMockedUser = { ...mockedUser, id: '2' }
        jest.spyOn(userService, 'findById').mockImplementation(async () => anotherMockedUser)

        const result = {
          response: 'Forbidden!',
          status: 403
        }
        
        try {
          await service.isAnswer(params.userId, params.questionId, params.answerId)
        }catch(err) {
          expect(err.response).toBe(result.response)
          expect(err.status).toBe(result.status)
        }
      })
      it('through another question', async () => {
        const anotherMockedQuestion = { ...mockedQuestion, user: { ...mockedUser, id: '2' } }
        jest.spyOn(questionService, 'findById').mockImplementation(async () => anotherMockedQuestion)

        const result = {
          response: 'Forbidden!',
          status: 403
        }
        
        try {
          await service.isAnswer(params.userId, params.questionId, params.answerId)
        }catch(err) {
          expect(err.response).toBe(result.response)
          expect(err.status).toBe(result.status)
        }
      })
    })
  })

  describe('updateRating', () => {
    const params = {
      userId: '1',
      answerId: '1'
    }

    it('should return { success: true }', async () => {
      const result = { success: true }

      expect(await service.updateRating(params.userId, params.answerId)).toEqual(result)
    })
  })
})