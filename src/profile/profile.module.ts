import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'

import { ProfileService } from './profile.service'
import { ProfileController } from './profile.controller'

import { UserModule } from '../user/user.module'
import { MailModule } from '../mail/mail.module'

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'access-jwt' }),
    UserModule,
    MailModule
  ],
  providers: [ProfileService],
  controllers: [ProfileController],
  exports: [ProfileService]
})
export class ProfileModule {}