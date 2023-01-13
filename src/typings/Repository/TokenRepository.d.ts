import { User } from '../../models/User'
import { Id } from '../Data/Database'

export interface TokenRepository<T> {
  create(data: Partial<T>): Promise<T>
  get(id: Id): Promise<T>
  update(user: User, data: T): Promise<T>
  remove(id: Id): Promise<T>
}
