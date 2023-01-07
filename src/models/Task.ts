import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

export enum TaskStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'in progress',
  DONE = 'done',
}

@Entity({ name: 'tasks' })
export class Task {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ length: 50 })
  title: string

  @Column({ length: 200 })
  description: string

  @Column({
    type: 'enum',
    enum: TaskStatus,
    default: TaskStatus.PENDING,
  })
  status: TaskStatus
}
