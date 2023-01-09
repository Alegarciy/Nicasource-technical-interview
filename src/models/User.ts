import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'
import { Task } from './Task'

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'varchar', length: 50 })
  username: string

  @Column({ type: 'varchar', length: 50 })
  email: string

  @Column({ type: 'varchar', length: 200 })
  password: string

  // Let's say a task has one user, and each user can have many tasks
  @OneToMany(() => Task, (task) => task.user)
  tasks: Task[]
}
