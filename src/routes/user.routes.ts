import { Router } from 'express'
import { UserService } from './../services/user.service'
import { UserController } from '../controllers/user.controller'

const router = Router()
const controller = new UserController(new UserService())

router.post('/', controller.create.bind(controller))

export default router
