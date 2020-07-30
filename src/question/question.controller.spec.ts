import { Test, TestingModule } from '@nestjs/testing'
import { ConfigService } from '@nestjs/config'
import { PassportModule } from '@nestjs/passport'

import { QuestionController } from './question.controller'
import { QuestionService } from './question.service'

import { JwtStrategyAccess } from '../auth/strategies/jwt.strategy-access'
import { JwtStrategyRefresh } from '../auth/strategies/jwt.strategy-refresh'

describe('Question Controller', () => {
  let controller: QuestionController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PassportModule.register({ defaultStrategy: 'access-jwt' })],
      controllers: [QuestionController],
      providers: [
        {
          provide: QuestionService,
          useValue: {}
        },
        {
          provide: ConfigService,
          useValue: {
            get(key: string) {
              switch (key) {
                case 'JWT_ACCESS_SECRET':
                  return 'SuperJwtAccess'
                case 'JWT_REFRESH_SECRET':
                  return 'SuperJwtRefresh'
              }
            }
          }
        },
        JwtStrategyAccess, 
        JwtStrategyRefresh
      ]
    }).compile()

    controller = module.get<QuestionController>(QuestionController);
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})