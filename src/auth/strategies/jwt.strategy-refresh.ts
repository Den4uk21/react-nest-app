import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'

@Injectable()
export class JwtStrategyRefresh extends PassportStrategy(Strategy, 'refresh-jwt') {
  constructor(
    private readonly configService: ConfigService, 
    ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>('JWT_REFRESH_SECRET'),
      ignoreExpiration: false,
    })
  }

  async validate(payload) {
    return { userId: payload.userId }
  }
}