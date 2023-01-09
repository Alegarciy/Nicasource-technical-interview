import { AppDataSource } from '../data-source'
// MODELS
import { Task } from './../models/Task'
import { User } from '../models/User'
// DATATYPES
import { UserRepository } from '../typings/Repository/UserRepository'
import { Id } from '../typings/Data/Database'
import { passwordEncription } from '../libs/encription'

export class UserService implements UserRepository<User> {
  private readonly repository = AppDataSource.getRepository(User)

  async create(data: Partial<User>): Promise<User> {
    const password = await passwordEncription(data.password)
    const user = this.repository.create({ ...data, password: password })
    await this.repository.save(user)
    return user
  }

  async list(): Promise<User[]> {
    return this.repository.find()
  }

  async get(id: Id): Promise<User> {
    const user = await this.repository.findOneBy({ id: id })

    if (!user) {
      throw new Error('User does not exists')
    }

    return user
  }

  async getUserByEmail(email: string): Promise<User> {
    const user = await this.repository.findOneBy({ email: email })

    if (!user) {
      return undefined
    }

    return user
  }

  async update(id: Id, data: User): Promise<User> {
    await this.repository.update(id, data)
    return this.get(id)
  }

  async remove(id: Id): Promise<User> {
    const user = await this.get(id)
    await this.repository.delete(id)
    return user
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
