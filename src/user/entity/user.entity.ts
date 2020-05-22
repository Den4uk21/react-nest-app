import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'
import { statusEnum } from '../enums/status.enum'
import { genderEnum } from '../enums/gender.enum'

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'text', default: null })
  avatarId: string

  @Column({ type: 'text' })
  firstName: string

  @Column({ type: 'text' })
  lastName: string

  @Column({ type: 'text', unique: true })
  email: string

  @Column({ type: 'text', enum: genderEnum })
  gender: string

  @Column({ type: 'text', enum: statusEnum, default: statusEnum.pending })
  status: string

  @Column({ type: 'text' })
  password: string
}