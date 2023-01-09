import { Request, Response } from 'express'
import { UserService } from '../services/user.service'

export class UserController {
  constructor(private service: UserService) {}

  async create(req: Request, res: Response): Promise<void> {
    try {
      const user = await this.service.create(req.body)
      res.status(200).json(user)
    } catch (error) {
      res.status(500).json(error)
    }
  }

  async list(req: Request, res: Response): Promise<void> {
    try {
      const users = await this.service.list()
      console.log(users)
      res.status(200).json(users)
    } catch (error) {
      res.status(500).json(error)
    }
  }

  async get(req: Request, res: Response): Promise<void> {
    try {
      const { userId } = req.params

      const user = await this.service.get(userId)

      res.status(200).json(user)
    } catch (error) {
      res.status(500).json(error)
    }
  }

  async getTasks(req: Request, res: Response): Promise<void> {
    try {
      const { userId } = req.params

      const tasks = await this.service.getTasks(userId)

      res.status(200).json(tasks)
    } catch (error) {
      res.status(500).json(error)
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    try {
      const { userId } = req.params
      const body = req.body

      const user = await this.service.update(userId, body)

      res.status(200).json(user)
    } catch (error) {
      res.status(500).json(error)
    }
  }

  async remove(req: Request, res: Response): Promise<void> {
    try {
      const { userId } = req.params

      const user = await this.service.remove(userId)

      res.status(200).json(user)
    } catch (error) {
      res.status(500).json(error)
    }
  }
}
