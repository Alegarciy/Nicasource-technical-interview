import { Router } from 'express'
import { TaskService } from '../services/task.service'
import { TaskController } from '../controllers/task.controller'

const router = Router()
const controller = new TaskController(new TaskService())

router.post('/', controller.create.bind(controller))
router.get('/', controller.list.bind(controller))

export default router
