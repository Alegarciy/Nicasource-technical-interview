import { Request, Response, NextFunction } from 'express'
import { IPayload } from '../typings/Data/Auth'
import jwt from 'jsonwebtoken'
require('dotenv').config()

export const signJwt = (payload: Object) => {
  const privateKey = process.env['ACCESS_TOKEN_PRIVATE_KEY'] || ''
  return jwt.sign({ payload: payload }, privateKey, { expiresIn: '5h' }) // 5hours
}

export const tokenValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.header('token')
    if (!token) return res.status(401).json('Access Denied')

    // this payload contains the user information
    const payload = jwt.verify(
      token,
      process.env['ACCESS_TOKEN_PRIVATE_KEY'] || ''
    ) as IPayload
    req.body.id = payload.id

    next()
  } catch (e) {
    res.status(400).send('Invalid Token')
  }
}
