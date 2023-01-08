import { Id } from '../Data/Database'
export interface TaskRepository<T> {
  create(data: Partial<T>): Promise<T>
  list(): Promise<T[]>
  get(id: Id): Promise<T>
  update(id: Id, data: T): Promise<T>
  remove(id: Id): Promise<T>
}
