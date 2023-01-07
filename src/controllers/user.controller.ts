import { Request, Response } from 'express'
import { UserService } from '../services/user.service'

export class UserController {
  constructor(private _userService: UserService) {}

  async create(req: Request, res: Response): Promise<void> {
    const { firstname, lastname, age } = req.body
    const requestStatus = this._userService.saveUser(firstname, lastname, age)
    res.send(requestStatus)
  }
}
