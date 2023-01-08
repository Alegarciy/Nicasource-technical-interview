import { Task } from '../models/Task'
import { AppDataSource } from '../data-source'

// DATATYPES
import { TaskRepository } from './../typings/Repository/TaskRepository.d'
import { Id } from '../typings/Data/Database'

export class TaskService implements TaskRepository<Task> {
  private readonly repository = AppDataSource.getRepository(Task)

  async create(data: Partial<Task>): Promise<Task> {
    const task = this.repository.create(data)
    await this.repository.save(task)
    return task
  }

  async list(): Promise<Task[]> {
    return this.repository.find()
  }

  async get(id: Id): Promise<Task> {
    const task = await this.repository.findOneBy({ id: id })

    if (!task) {
      throw new Error('Task does not exists')
    }

    return task
  }

  async update(id: Id, data: Task): Promise<Task> {
    await this.repository.update(id, data)
    return this.get(id)
  }

  async remove(id: Id): Promise<Task> {
    const task = await this.get(id)
    await this.repository.delete(id)
    return task
  }
}
