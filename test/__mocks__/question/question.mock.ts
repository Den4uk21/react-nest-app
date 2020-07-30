import { Question } from '../../../src/question/entity/question.entity'
import { mockedAnswer } from '../answer/answer.mock'
import { mockedUser } from '../user/user.mock'

export const mockedQuestion: Question = {
  id: '1',
  title: 'Test question',
  descriptions: 'descriptions...',
  categories: ['All'],
  date: 1,
  answers: [mockedAnswer],
  user: mockedUser
}