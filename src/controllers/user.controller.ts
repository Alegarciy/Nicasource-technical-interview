import { Request, Response } from 'express'
import { UserService } from '../services/user.service'

export class UserController {
  constructor(private readonly _userService: UserService) {}

  async post(req: Request, res: Response) {
    const { firstname, lastname, age } = req.body
    console.log(firstname)
    const status = this._userService.saveUser(firstname, lastname, age)
    res.send(status)
  }
}
