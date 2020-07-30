import { User } from '../../../src/user/entity/user.entity'
import { mockedAnswer } from '../answer/answer.mock'
import { mockedQuestion } from '../question/question.mock'

export const mockedUser: User = {
  id: '1',
  avatarId: '1',
  userName: 'Tester',
  email: 'test@test.com',
  status: 'active',
  bio: 'Some bio',
  motto: 'Some motto',
  password: 'hash',
  answers: [mockedAnswer],
  questions: [mockedQuestion]
}