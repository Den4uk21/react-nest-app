import { Answer } from '../../../src/answer/entity/answer.entity'
import { mockedUser } from '../user/user.mock'
import { mockedQuestion } from '../question/question.mock'

export const mockedAnswer: Answer = {
  id: '1',
  answer: 'test',
  date: 1,
  isAnswer: true,
  rating: ['1'],
  question: mockedQuestion,
  user: mockedUser
}