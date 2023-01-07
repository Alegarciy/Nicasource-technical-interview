import { TaskStatus, Task } from '../models/Task'
import { AppDataSource } from '../data-source'

export class TaskService {
  private readonly _taskRepository = AppDataSource.getRepository(Task)

  async saveTask(
    title: string,
    description: string,
    status: TaskStatus
  ): Promise<number> {
    try {
      const task = new Task()
      task.title = title
      task.description = description
      task.status = status
      this._taskRepository.save(task)
      return 200
    } catch {
      console.log('ERR: ~ 🦋🦋🦋 line 20 saveTask.js')
      return 1
    }
  }

  async listTasks(): Promise<number> {
    try {
      return 200
    } catch {
      console.log('ERR: ~ 🦋🦋🦋 line 21 listTask.js')
      return 1
    }
  }
}
