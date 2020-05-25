import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm'
import { User } from '../../user/entity/user.entity'

@Entity()
export class Question {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'text' })
  title: string

  @Column({ type: 'text' })
  descriptions: string

  @Column({ type: 'text', array: true, default: [] })
  category: string[]

  @Column({ type: 'bigint', default: Date.now() })
  date: Date

  @ManyToOne(type => User, user => user.questions)
  user: User
}