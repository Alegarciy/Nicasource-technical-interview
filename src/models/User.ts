import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'varchar', length: 50 })
  firstName: string

  @Column({ type: 'varchar', length: 50 })
  lastName: string

  @Column()
  age: number
}
