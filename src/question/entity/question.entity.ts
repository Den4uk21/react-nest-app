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

  @Column({ type: 'text', array: true })
  categories: string[]

  @Column({ type: 'text', default: new Date().toLocaleDateString() })
  date: string

  @ManyToOne(type => User, user => user.questions)
  user: User
}