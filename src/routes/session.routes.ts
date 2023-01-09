import { Router } from 'express'
import { UserService } from '../services/user.service'
import { SessionController } from '../controllers/session.controller'
import { tokenValidation } from '../middleware/jwt'

const router = Router()
const controller = new SessionController(new UserService())

router.post('/singup', controller.singup.bind(controller))

export default router
