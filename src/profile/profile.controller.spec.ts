import { Test, TestingModule } from '@nestjs/testing'
import { ConfigService } from '@nestjs/config'
import { PassportModule } from '@nestjs/passport'

import { ProfileController } from './profile.controller'
import { ProfileService } from './profile.service'
import { UserService } from '../user/user.service'

import { JwtStrategyAccess } from '../auth/strategies/jwt.strategy-access'
import { JwtStrategyRefresh } from '../auth/strategies/jwt.strategy-refresh'

describe('Profile Controller', () => {
  let controller: ProfileController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PassportModule.register({ defaultStrategy: 'access-jwt' })],
      controllers: [ProfileController],
      providers: [
        {
          provide: ProfileService,
          useValue: {}
        },
        {
          provide: UserService,
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

    controller = module.get<ProfileController>(ProfileController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})