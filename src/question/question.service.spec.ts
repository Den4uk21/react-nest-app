import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { QuestionService } from './question.service'
import { UserService } from '../user/user.service'

import { Question } from './entity/question.entity'

import { CreateQuestionDto } from './dto/create-question.dto'
import { FilterQuestionDto } from './dto/filter-question.dto'

import { mockedQuestion } from '../../test/__mocks__/question/question.mock'
import { mockedUser } from '../../test/__mocks__/user/user.mock'
import { questionTypeEnum } from './enums/question-type.enum'

describe('QuestionService', () => {
  let service: QuestionService
  let userService: UserService
  let repository: Repository<Question>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        QuestionService,
        {
          provide: getRepositoryToken(Question),
          useValue: {
            find: jest.fn(async () => [mockedQuestion]),
            create: jest.fn(() => mockedQuestion),
            save: jest.fn(),
            findOne: jest.fn(() => mockedQuestion),
            update: jest.fn(),
            delete: jest.fn()
          },
        },
        {
          provide: UserService,
          useValue: {
            findByName: jest.fn(async () => mockedUser),
            getDate: jest.fn(() => 'date'),
            findById: jest.fn(async () => mockedUser),
            getAvatar: jest.fn(() => 'avatar')
          }
        }
      ]
    }).compile()

    service = module.get<QuestionService>(QuestionService)
    userService = module.get<UserService>(UserService)
    repository = module.get<Repository<Question>>(getRepositoryToken(Question))
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('createQuestion', () => {
    const params = {
      userId: '1'
    }
    const createQuestionDto: CreateQuestionDto = {
      title: 'Test question',
      descriptions: 'descriptions...',
      categories: ['All']
    }

    it('should return { success: true }', async () => {
      const result = { success: true }

      expect(await service.createQuestion(params.userId, createQuestionDto)).toEqual(result)
    })
  })

  describe('getUserQuestionsNoAnswers', () => {
    const params = {
      userName: 'Tester',
      page: 1
    }

    it('should return the list of questions and their number', async () => {
      jest.spyOn(repository, 'find').mockImplementation(async () => [{...mockedQuestion, answers: []}])

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { descriptions, answers, ...data } = mockedQuestion
      const validMockedQuestion = { ...data, date: 'date', answersAmount: 0 }

      const result = {
        questionsList: [validMockedQuestion],
        amount: 1
      }
      expect(await service.getUserQuestionsNoAnswers(params.userName, params.page)).toEqual(result)
    })
    it('should return an empty the list of questions', async () => {
      jest.spyOn(repository, 'find').mockImplementation(async () => [{...mockedQuestion, answers: []}])

      const newParams = { ...params, page: 2 }
      const result = {
        questionsList: [],
        amount: 1
      }
      expect(await service.getUserQuestionsNoAnswers(newParams.userName, newParams.page)).toEqual(result)
    })
    it('should return that the user was not found', async () => {
      jest.spyOn(userService, 'findByName').mockImplementation(async () => null)

      const result = {
        response: 'User not Found!',
        status: 404
      }
      
      try {
        await service.getUserQuestionsNoAnswers(params.userName, params.page)
      }catch(err) {
        expect(err.response).toBe(result.response)
        expect(err.status).toBe(result.status)
      }
    })
  })

  describe('getUserQuestionsWithAnswers', () => {
    const params = {
      userName: 'Tester',
      page: 1
    }

    it('should return the list of questions and their number', async () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { descriptions, answers, ...data } = mockedQuestion
      const validMockedQuestion = { ...data, date: 'date', answersAmount: 1 }

      const result = {
        questionsList: [validMockedQuestion],
        amount: 1
      }
      expect(await service.getUserQuestionsWithAnswers(params.userName, params.page)).toEqual(result)
    })
    it('should return an empty the list of questions', async () => {
      const newParams = { ...params, page: 2 }
      const result = {
        questionsList: [],
        amount: 1
      }
      expect(await service.getUserQuestionsWithAnswers(newParams.userName, newParams.page)).toEqual(result)
    })
    it('should return that the user was not found', async () => {
      jest.spyOn(userService, 'findByName').mockImplementation(async () => null)

      const result = {
        response: 'User not Found!',
        status: 404
      }
      
      try {
        await service.getUserQuestionsWithAnswers(params.userName, params.page)
      }catch(err) {
        expect(err.response).toBe(result.response)
        expect(err.status).toBe(result.status)
      }
    })
  })

  describe('getAllQuestions', () => {
    const params = {
      page: 1
    }

    it('should return questionsList and amount { type: `new` }', async () => {
      const filterQuestionDto: FilterQuestionDto = {
        type: questionTypeEnum.new
      }

      const newMockedQuestion: Question = {
        ...mockedQuestion,
        id: '2',
        title: 'New question',
        date: 2
      }

      jest.spyOn(repository, 'find').mockImplementation(async () => [mockedQuestion, newMockedQuestion])

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { descriptions, answers, ...validMockedQuestion } = mockedQuestion
      const newValidMockedQuestion = {
        ...validMockedQuestion,
        id: '2',
        title: 'New question',
      }

      const result = {
        questionsList: [
          {...newValidMockedQuestion, date: 'date', answersAmount: 1},
          {...validMockedQuestion, date: 'date', answersAmount: 1}
        ],
        amount: 2
      }

      expect(await service.getAllQuestions(params.page, filterQuestionDto)).toEqual(result)
    })
    it('should return questionsList and amount { type: `popular` }', async () => {
      const filterQuestionDto: FilterQuestionDto = {
        type: questionTypeEnum.popular
      }

      const newMockedQuestion: Question = {
        ...mockedQuestion,
        id: '2',
        title: 'New question',
        date: 2,
        answers: []
      }

      jest.spyOn(repository, 'find').mockImplementation(async () => [mockedQuestion, newMockedQuestion])

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { descriptions, answers, ...validMockedQuestion } = mockedQuestion
      const newValidMockedQuestion = {
        ...validMockedQuestion,
        id: '2',
        title: 'New question',
      }

      const result = {
        questionsList: [
          {...validMockedQuestion, date: 'date', answersAmount: 1},
          {...newValidMockedQuestion, date: 'date', answersAmount: 0}
        ],
        amount: 2
      }

      expect(await service.getAllQuestions(params.page, filterQuestionDto)).toEqual(result)
    })
    it('should return questionsList and amount { type: `without_answers` }', async () => {
      const filterQuestionDto: FilterQuestionDto = {
        type: questionTypeEnum.withoutAnswers
      }

      const newMockedQuestion: Question = {
        ...mockedQuestion,
        id: '2',
        title: 'New question',
        date: 2,
        answers: []
      }

      jest.spyOn(repository, 'find').mockImplementation(async () => [mockedQuestion, newMockedQuestion])

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { descriptions, answers, ...validMockedQuestion } = mockedQuestion
      const newValidMockedQuestion = {
        ...validMockedQuestion,
        id: '2',
        title: 'New question',
      }

      const result = {
        questionsList: [
          {...newValidMockedQuestion, date: 'date', answersAmount: 0}
        ],
        amount: 1
      }

      expect(await service.getAllQuestions(params.page, filterQuestionDto)).toEqual(result)
    })
    it('should return questionsList and amount { with categories }', async () => {
      const filterQuestionDto: FilterQuestionDto = {
        type: questionTypeEnum.new,
        categories: ['Math']
      }

      const newMockedQuestion: Question = {
        ...mockedQuestion,
        id: '2',
        title: 'New question',
        categories: ['Math'],
        date: 2
      }

      jest.spyOn(repository, 'find').mockImplementation(async () => [mockedQuestion, newMockedQuestion])

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { descriptions, answers, ...validMockedQuestion } = mockedQuestion
      const newValidMockedQuestion = {
        ...validMockedQuestion,
        id: '2',
        title: 'New question',
        categories: ['Math']
      }

      const result = {
        questionsList: [
          {...newValidMockedQuestion, date: 'date', answersAmount: 1}
        ],
        amount: 1
      }

      expect(await service.getAllQuestions(params.page, filterQuestionDto)).toEqual(result)
    })
    it('should return an empty questionsList', async () => {
      const newParams = {
        page: 2
      }
      const filterQuestionDto: FilterQuestionDto = {
        type: questionTypeEnum.new
      }

      const result = {
        questionsList: [],
        amount: 1
      }

      expect(await service.getAllQuestions(newParams.page, filterQuestionDto)).toEqual(result)
    })
  })

  describe('getQuestion', () => {
    const params = {
      questionId: '1'
    }

    it('should return information about the question', async () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { user, ...validMockedQuestion } = mockedQuestion

      const result = {
        ...validMockedQuestion,
        date: 'date',
        userName: user.userName,
        avatarUrl: 'avatar'
      }

      expect(await service.getQuestion(params.questionId)).toEqual(result)
    })
    it('should return that the user was not found', async () => {
      jest.spyOn(repository, 'findOne').mockImplementation(async () => null)

      const result = {
        response: 'Question not found!',
        status: 404
      }
      
      try {
        await service.getQuestion(params.questionId)
      }catch(err) {
        expect(err.response).toBe(result.response)
        expect(err.status).toBe(result.status)
      }
    })
  })

  describe('updateQuestion', () => {
    const params = {
      userId: '1',
      questionId: '1'
    }
    const updateQuestionDto: CreateQuestionDto = {
      title: 'Updated question',
      descriptions: 'descriptions...',
      categories: ['All']
    }

    it('should return { success: true }', async () => {
      const result = { success: true }

      expect(await service.updateQuestion(params.userId, params.questionId, updateQuestionDto)).toEqual(result)
    })
    it('should return error that access is forbidden', async () => {
      const newParams = { ...params, userId: '2' }

      const result = {
        response: 'Forbidden!',
        status: 403
      }
      
      try {
        await service.updateQuestion(newParams.userId, newParams.questionId, updateQuestionDto)
      }catch(err) {
        expect(err.response).toBe(result.response)
        expect(err.status).toBe(result.status)
      }
    })
  })

  describe('deleteQuestion', () => {
    const params = {
      userId: '1',
      questionId: '1'
    }

    it('should return { success: true }', async () => {
      const result = { success: true }

      expect(await service.deleteQuestion(params.userId, params.questionId)).toEqual(result)
    })
    it('should return error that access is forbidden', async () => {
      const newParams = { ...params, userId: '2' }

      const result = {
        response: 'Forbidden!',
        status: 403
      }
      
      try {
        await service.deleteQuestion(newParams.userId, newParams.questionId)
      }catch(err) {
        expect(err.response).toBe(result.response)
        expect(err.status).toBe(result.status)
      }
    })
  })

  describe('findById', () => {
    const params = {
      questionId: '1'
    }

    it('should return the questions object', async () => {
      expect(await service.findById(params.questionId)).toEqual(mockedQuestion)
    })
  })
})