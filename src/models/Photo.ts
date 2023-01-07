import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity({ name: 'photos' })
export class Photo {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ length: 50 })
  name: string

  @Column()
  description: string

  @Column('text')
  filename: string

  @Column('double')
  views: number

  @Column()
  isPublished: boolean
}
