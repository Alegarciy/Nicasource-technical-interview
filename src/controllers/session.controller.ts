import { Request, Response } from 'express'
import { signJwt } from '../middleware/jwt'
import { passwordValidation } from '../libs/encription'

// MODELS
import { User } from './../models/User'
import { Token } from '../models/Token'

// SERVICES
import { UserService } from '../services/user.service'
import { TokenService } from '../services/token.service'

export class SessionController {
  constructor(
    private userService: UserService,
    private tokenService: TokenService
  ) {}

  async singup(req: Request, res: Response): Promise<void> {
    // Email Validation
    const emailExists = await this.userService.getUserByEmail(req.body.email)
    if (emailExists) {
      res.status(400).json('Email already exists')
      return
    }

    // Saving new User
    try {
      const user: User = await this.userService.create(req.body)
      const token: string = signJwt(JSON.stringify(user))
      await this.tokenService.create({ token: token, user: user })

      const response = { ...user, token: token, password: '' }
      res.status(200).json(response)
    } catch (error) {
      res.status(500).json(error)
    }
  }

  async signin(req: Request, res: Response): Promise<void> {
    // Email Validation
    const user = await this.userService.getUserByEmail(req.body.email)
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

    try {
      // Generate Token
      const token: string = signJwt(JSON.stringify(user))

      // Update Stored Token
      if (await this.tokenService.userExists(user)) {
        // if user does not exists, create a new register with a token
        await this.tokenService.update(user, { token: token, user: user })
      } else {
        //if user exists with a token, update it
        await this.tokenService.create({ token: token, user: user })
      }

      const response = { ...user, token: token, password: '' }
      res.status(200).json(response)
    } catch (error) {
      console.log('error')
      res.status(500).json(error)
      console.log('error')
    }
  }

  async logout(req: Request, res: Response): Promise<void> {
    try {
      const token = await this.tokenService.getByUserId(req.body.userId)
      const deletedToken = await this.tokenService.remove(token.id)
      res.status(200).json(deletedToken)
    } catch (error) {
      console.log(error)
      res.status(400).send('Error logging out')
    }
  }
}
