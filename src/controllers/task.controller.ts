import { Request, Response } from 'express'
import { TaskService } from '../services/task.service'

export class TaskController {
  constructor(private readonly service: TaskService) {}

  async create(req: Request, res: Response): Promise<void> {
    try {
      const task = await this.service.create(req.body)
      res.status(200).json(task)
    } catch (error) {
      res.status(500).json(error)
    }
  }

  async list(req: Request, res: Response): Promise<void> {
    try {
      const tasks = await this.service.list()
      console.log(tasks)
      res.status(200).json(tasks)
    } catch (error) {
      res.status(500).json(error)
    }
  }

  async get(req: Request, res: Response): Promise<void> {
    try {
      const { taskId } = req.params

      const task = await this.service.get(+taskId) // str to num convertion

      res.status(200).json(task)
    } catch (error) {
      res.status(500).json(error)
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    try {
      const { taskId } = req.params
      const body = req.body

      const task = await this.service.update(+taskId, body)

      res.status(200).json(task)
    } catch (error) {
      res.status(500).json(error)
    }
  }

  async remove(req: Request, res: Response): Promise<void> {
    try {
      const { taskId } = req.params

      const task = await this.service.remove(+taskId)

      res.status(200).json(task)
    } catch (error) {
      res.status(500).json(error)
    }
  }
}
