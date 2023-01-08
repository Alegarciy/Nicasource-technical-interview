import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'
import { Task } from './Task'

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'varchar', length: 50 })
  nickname: string

  @Column({ type: 'varchar', length: 50 })
  password: string

  // Let's say a task has one user, and each user can have many tasks
  @OneToMany(() => Task, (task) => task.user)
  tasks: Task[]
}
