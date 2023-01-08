import { AppDataSource } from '../data-source'
// MODELS
import { Task } from './../models/Task'
import { User } from '../models/User'
// DATATYPES
import { UserRepository } from '../typings/Repository/UserRepository'
import { Id } from '../typings/Data/Database'

export class UserService implements UserRepository<User> {
  private readonly repository = AppDataSource.getRepository(User)

  async create(data: Partial<User>): Promise<User> {
    const task = this.repository.create(data)
    await this.repository.save(task)
    return task
  }

  async list(): Promise<User[]> {
    return this.repository.find()
  }

  async get(id: Id): Promise<User> {
    const task = await this.repository.findOneBy({ id: id })

    if (!task) {
      throw new Error('User does not exists')
    }

    return task
  }

  async update(id: Id, data: User): Promise<User> {
    await this.repository.update(id, data)
    return this.get(id)
  }

  async remove(id: Id): Promise<User> {
    const task = await this.get(id)
    await this.repository.delete(id)
    return task
  }

  async getTasks(id: Id): Promise<Task[]> {
    const user = await this.repository.findOne({
      where: {
        id: id,
      },
      relations: {
        tasks: true,
      },
    })

    if (!user) {
      throw new Error('User does not exists')
    }

    return user.tasks
  }
}
