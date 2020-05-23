import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'

import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'

import { JwtStrategyAccess } from './strategies/jwt.strategy-access'
import { JwtStrategyRefresh } from './strategies/jwt.strategy-refresh'
import { configModule } from '../configure.root'

import { UserModule } from '../user/user.module'
import { MailModule } from '../mail/mail.module'

@Module({
  imports: [
    configModule,
    PassportModule.register({ defaultStrategy: 'access-jwt' }),
    UserModule,
    MailModule
  ],
  providers: [AuthService, JwtStrategyAccess, JwtStrategyRefresh],
  controllers: [AuthController]
})
export class AuthModule {}