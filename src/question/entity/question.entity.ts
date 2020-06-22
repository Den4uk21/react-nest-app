/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm'
import { User } from '../../user/entity/user.entity'
import { Answer } from '../../answer/entity/answer.entity'

@Entity()
export class Question {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'text' })
  title: string

  @Column({ type: 'text' })
  descriptions: string

  @Column({ type: 'text', array: true })
  categories: string[]

  @Column({ type: 'bigint', default: Date.now() })
  date: number

  @ManyToOne(type => User, user => user.questions)
  user: User

  @OneToMany(type => Answer, answer => answer.question)
  answers: Answer[]
}