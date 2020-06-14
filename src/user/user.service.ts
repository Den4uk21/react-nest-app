/* eslint-disable @typescript-eslint/camelcase */
import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import * as bcrypt from 'bcrypt'
import * as fs from 'fs'
import * as cloudinary from 'cloudinary'

import { User } from './entity/user.entity'
import { CreateUserDto } from './dto/create-user.dto'
import { IResponse } from '../auth/interfaces/response.interface'

@Injectable()
export class UserService {
  private readonly saltRounds = 12

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private readonly configService: ConfigService
  ) {
    cloudinary.v2.config ({ 
      cloud_name : 'dh4k4jylq' , 
      api_key : this.configService.get<string>('CLOUDINARY_API_KEY'), 
      api_secret : this.configService.get<string>('CLOUDINARY_API_SECRET')  
   })
  }

  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(this.saltRounds)
    return bcrypt.hash(password, salt)
  }

  async comparePassword(password: string, userPassword: string): Promise<boolean> {
    return bcrypt.compare(password, userPassword)
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

  async uploadAvatar(userId: string, file: string): Promise<IResponse> {
    const user = await this.findById(userId)
    if(user.avatarId) {
      cloudinary.v2.uploader.destroy(user.avatarId)
    }
    
    cloudinary.v2.uploader.upload(file, {
        image_metadata: false,
        folder: 'avatars'
      }, async (err, res) => {
      if(err) throw new HttpException(err, HttpStatus.BAD_REQUEST)
        
      await this.update(userId, { avatarId: res.public_id })
    })

    fs.unlink(file, (err) => {
      console.log(err)
    })

    return { success: true }
  }

  getAvatar(avatarId: string, options?): string {
    return cloudinary.v2.url(avatarId, { width: 50, height: 50, crop: 'scale', secure: true, radius: 5, ...options })
  }

  getDate(date: number): string {
    const vailidDate = new Date(Number(date))
    return `${vailidDate.getFullYear()}-${vailidDate.getMonth() + 1}-${vailidDate.getDate()}`
  }
}