import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import * as bcrypt from 'bcrypt'

import { User } from './entity/user.entity'
import { CreateUserDto } from './dto/create-user.dto'

@Injectable()
export class UserService {
  private readonly saltRounds = 12

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {}

  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(this.saltRounds)
    return bcrypt.hash(password, salt)
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const hash = await this.hashPassword(createUserDto.password)
    const user = await this.usersRepository.create({ ...createUserDto, password: hash })

    await this.usersRepository.save(user)
    return user
  }

  async findById(id: string): Promise<User> {
    return this.usersRepository.findOne(id)
  }

  async findByEmail(email: string): Promise<User> {
    return this.usersRepository.findOne({ email })
  }

  async findByName(userName: string): Promise<User> {
    return this.usersRepository.findOne({ userName })
  }

  async update(id: string, data): Promise<void> {
    await this.usersRepository.update(id, data)
  }
}