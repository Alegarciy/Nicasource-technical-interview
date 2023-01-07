import { UserService } from './../services/user.service'
import { Router } from 'express'
import { UserController } from '../controllers/user.controller'

const router = Router()
const userController = new UserController(new UserService())

router.post('/', (req, res) => {
  userController.post(req, res)
})

export default router
