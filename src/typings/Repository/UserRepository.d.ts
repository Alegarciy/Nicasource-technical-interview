import { Task } from './../../models/Task'
import { Id } from '../Data/Database'

export interface UserRepository<T> {
  create(data: Partial<T>): Promise<T>
  list(): Promise<T[]>
  get(id: Id): Promise<T>
  getTasks(id: Id): Promise<Task[]>
  update(id: Id, data: T): Promise<T>
  remove(id: Id): Promise<T>
}
