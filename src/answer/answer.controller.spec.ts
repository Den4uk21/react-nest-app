import { Test, TestingModule } from '@nestjs/testing'
import { ConfigService } from '@nestjs/config'
import { PassportModule } from '@nestjs/passport'

import { AnswerController } from './answer.controller'
import { AnswerService } from './answer.service'

import { JwtStrategyAccess } from '../auth/strategies/jwt.strategy-access'
import { JwtStrategyRefresh } from '../auth/strategies/jwt.strategy-refresh'

describe('Answer Controller', () => {
  let controller: AnswerController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PassportModule.register({ defaultStrategy: 'access-jwt' })],
      controllers: [AnswerController],
      providers: [
        {
          provide: AnswerService,
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

    controller = module.get<AnswerController>(AnswerController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})