/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm'
import { User } from '../../user/entity/user.entity'
import { Question } from '../../question/entity/question.entity'

@Entity()
export class Answer {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'text' })
  answer: string

  @Column({ type: 'bool', default: false })
  isAnswer: boolean

  @Column({ type: 'uuid', array: true, default: {} })
  rating: string[]

  @Column({ type: 'bigint', default: Date.now() })
  date: number

  @ManyToOne(type => Question, question => question.answers, { onDelete: 'CASCADE' })
  question: Question

  @ManyToOne(type => User, user => user.answers)
  user: User
}