import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { configModule } from './configure.root'

@Module({
  imports: [
    configModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: process.env.USERNAME_DB,
      password: process.env.PASSWORD_DB,
      database: 'postgresDB',
      autoLoadEntities: true,
      synchronize: true
    }),
  ]
})
export class AppModule {}