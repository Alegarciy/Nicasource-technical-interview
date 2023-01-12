import { tokenValidation } from '../middleware/jwt'
import { Router } from 'express'
import { UserService } from './../services/user.service'
import { UserController } from '../controllers/user.controller'

const router = Router()
const controller = new UserController(new UserService())

/**
 * @swagger
 *
 * components:
 *  schemas:
 *    TaskList:
 *      type: array
 *      items:
 *        anyOf:
 *          - $ref: '#/components/schemas/Task'
 *
 */

/**
 * @swagger
 * /user/tasks/{userId}:
 *  get:
 *    parameters:
 *      - in: header
 *        name: token
 *        required: true
 *        schema:
 *          type: string
 *        description: Token generado por JWT
 *      - in: path
 *        name: userId
 *        required: true
 *        schema:
 *          type: string
 *        description: id of the user owner of the tasks
 *    summary: See a list of the tasks
 *    tags: [User]
 *    responses:
 *      200:
 *        description: the list of task was selected from a user succesfully
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/TaskList'
 *
 */
router.get(
  '/tasks/:userId',
  tokenValidation,
  controller.getTasks.bind(controller)
)

export default router
