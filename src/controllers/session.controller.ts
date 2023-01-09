import { User } from './../models/User'
import { Request, Response } from 'express'
import { UserService } from '../services/user.service'
import { signJwt } from '../middleware/jwt'
import { passwordEncription } from '../libs/encription'

export class SessionController {
  constructor(private service: UserService) {}

  async singup(req: Request, res: Response): Promise<void> {
    try {
      const user: User = await this.service.create(req.body)
      user.password = await passwordEncription(user.password)
      const token: string = signJwt(JSON.stringify(user))
      const response = { ...user, token: token }
      res.status(200).json(response)
    } catch (error) {
      console.log(error)
      res.status(500).json(error)
    }
  }
}
