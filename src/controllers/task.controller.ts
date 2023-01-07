import { Request, Response } from 'express'
import { TaskService } from '../services/task.service'

export class TaskController {
  constructor(private readonly _taskService: TaskService) {}

  async create(req: Request, res: Response): Promise<void> {
    const { title, description, status } = req.body
    const requestStatus = this._taskService.saveTask(title, description, status)
    res.send(requestStatus)
  }

  async list(req: Request, res: Response): Promise<void> {
    const requestStatus = this._taskService.listTasks()
    res.send(requestStatus)
  }
}
