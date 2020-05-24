import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'
import { statusEnum } from '../enums/status.enum'
import { genderEnum } from '../enums/gender.enum'

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'text', default: null })
  avatarId: string | null

  @Column({ type: 'text', unique: true })
  userName: string

  @Column({ type: 'text', unique: true })
  email: string

  @Column({ type: 'text', enum: genderEnum })
  gender: string

  @Column({ type: 'text', default: null })
  motto: string | null

  @Column({ type: 'text', default: null })
  bio: string | null

  @Column({ type: 'text', enum: statusEnum, default: statusEnum.pending })
  status: string

  @Column({ type: 'text' })
  password: string
}