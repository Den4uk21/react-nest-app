import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm'
import { statusEnum } from '../enums/status.enum'
import { Question } from '../../question/entity/question.entity'

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'text', default: 'avatars/default-avatar.jpg' })
  avatarId: string

  @Column({ type: 'text', unique: true })
  userName: string

  @Column({ type: 'text', unique: true })
  email: string

  @Column({ type: 'text', default: null })
  motto: string | null

  @Column({ type: 'text', default: null })
  bio: string | null

  @Column({ type: 'text', enum: statusEnum, default: statusEnum.pending })
  status: string

  @Column({ type: 'text' })
  password: string

  @OneToMany(type => Question, question => question.user)
  questions: Question[]
}