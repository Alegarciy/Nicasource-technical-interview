import { Router } from 'express'
import { TaskService } from '../services/task.service'
import { TaskController } from '../controllers/task.controller'

const router = Router()
const controller = new TaskController(new TaskService())

router.post('/', controller.create.bind(controller))
router.get('/', controller.list.bind(controller))
router.get('/:taskId', controller.get.bind(controller))
router.put('/:taskId', controller.update.bind(controller))
router.delete('/:taskId', controller.remove.bind(controller))

export default router
