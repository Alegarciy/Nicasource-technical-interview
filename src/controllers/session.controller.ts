import { User } from './../models/User'
import { Request, Response } from 'express'
import { UserService } from '../services/user.service'
import { signJwt } from '../middleware/jwt'
import { passwordEncription, passwordValidation } from '../libs/encription'
import { RepositoryNotTreeError } from 'typeorm'

export class SessionController {
  constructor(private service: UserService) {}

  async singup(req: Request, res: Response): Promise<void> {
    // Email Validation
    const emailExists = await this.service.getUserByEmail(req.body.email)
    if (emailExists) {
      res.status(400).json('Email already exists')
      return
    }

    // Saving new User
    try {
      const user: User = await this.service.create(req.body)
      const token: string = signJwt(JSON.stringify(user))
      const response = { ...user, token: token, password: '' }
      res.status(200).json(response)
    } catch (error) {
      res.status(500).json(error)
    }
  }

  async signin(req: Request, res: Response): Promise<void> {
    // Email Validation
    const user = await this.service.getUserByEmail(req.body.email)
    if (!user) {
      res.status(400).json('Email or Password is wrong')
      return
    }

    // Password Validation
    const correctPassword = await passwordValidation(
      user.password,
      req.body.password
    )
    if (!correctPassword) {
      res.status(400).json('Invalid Password')
      return
    }

    // Generate Token
    const token: string = signJwt(JSON.stringify(user))
    const response = { ...user, token: token, password: '' }
    res.status(200).json(response)
  }
}
