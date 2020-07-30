import { Test, TestingModule } from '@nestjs/testing'
import { ConfigService } from '@nestjs/config'
import { PassportModule } from '@nestjs/passport'

import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'

import { JwtStrategyAccess } from './strategies/jwt.strategy-access'
import { JwtStrategyRefresh } from './strategies/jwt.strategy-refresh'

describe('AuthController', () => {
  let controller: AuthController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PassportModule.register({ defaultStrategy: 'access-jwt' })],
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
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

    controller = module.get<AuthController>(AuthController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})