import { Router } from 'express'
import { TaskService } from '../services/task.service'
import { TaskController } from '../controllers/task.controller'
import { tokenValidation } from '../middleware/jwt'

const router = Router()
const controller = new TaskController(new TaskService())

router.get('/:taskId', tokenValidation, controller.get.bind(controller))
router.post('/', tokenValidation, controller.create.bind(controller))
router.put('/:taskId', tokenValidation, controller.update.bind(controller))
router.delete('/:taskId', tokenValidation, controller.remove.bind(controller))

export default router
