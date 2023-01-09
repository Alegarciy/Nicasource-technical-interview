import { tokenValidation } from '../middleware/jwt'
import { Router } from 'express'
import { UserService } from './../services/user.service'
import { UserController } from '../controllers/user.controller'

const router = Router()
const controller = new UserController(new UserService())

router.post('/', controller.create.bind(controller))
router.get('/', tokenValidation, controller.list.bind(controller))
router.get('/:userId', tokenValidation, controller.get.bind(controller))
router.get('/tasks/:userId', controller.getTasks.bind(controller))
router.put('/:userId', controller.update.bind(controller))
router.delete('/:userId', controller.remove.bind(controller))

export default router
