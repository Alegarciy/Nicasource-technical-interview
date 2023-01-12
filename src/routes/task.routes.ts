import { Router } from 'express'
import { TaskService } from '../services/task.service'
import { TaskController } from '../controllers/task.controller'
import { tokenValidation } from '../middleware/jwt'

const router = Router()
const controller = new TaskController(new TaskService())

/**
 * @swagger
 *
 * components:
 *  schemas:
 *    Task:
 *      type: object
 *      properties:
 *        title:
 *          type: string
 *          description: title of the task
 *        description:
 *          type: string
 *          description: details about the task
 *        status:
 *          type: string
 *          enum: [pending, in progress, done]
 *          description: the status is the state of a task
 *        user:
 *          type: string
 *          description: user id that created the task
 *      required:
 *        - title
 *        - description
 *        - status
 *        - user
 *      example:
 *        title: windmill
 *        description: boxer work
 *        user: 0bb3d562-2bb5-43b0-9cb8-573edece2a51
 *        status: in progress
 *
 *    TaskUpdate:
 *      type: object
 *      properties:
 *        title:
 *          type: string
 *          description: title of the task
 *        description:
 *          type: string
 *          description: details about the task
 *        status:
 *          type: string
 *          enum: [pending, in progress, done]
 *          description: the status is the state of a task
 *      example:
 *        title: windmill again
 *        description: boxer work and work
 *        status: done
 */

/**
 * @swagger
 * /task/{taskId}:
 *  get:
 *    parameters:
 *      - in: header
 *        name: token
 *        required: true
 *        schema:
 *          type: string
 *        description: Token generado por JWT
 *      - in: path
 *        name: taskId
 *        required: true
 *        schema:
 *          type: string
 *        description: id of task you want to see the details of
 *    summary: See singular task details
 *    tags: [Task]
 *    responses:
 *      200:
 *        description: the task was selected
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Task'
 *
 */
router.get('/:taskId', tokenValidation, controller.get.bind(controller))

/**
 * @swagger
 * /task:
 *  post:
 *    parameters:
 *      - in: header
 *        name: token
 *        required: true
 *        schema:
 *          type: string
 *        description: Token generado por JWT
 *    summary: create task and assign it to the user
 *    tags: [Task]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Task'
 *    responses:
 *      200:
 *        description: the task was succesfully created
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Task'
 *
 */
router.post('/', tokenValidation, controller.create.bind(controller))

/**
 * @swagger
 * /task/{taskId}:
 *  put:
 *    parameters:
 *      - in: header
 *        name: token
 *        required: true
 *        schema:
 *          type: string
 *        description: Token generado por JWT
 *      - in: path
 *        name: taskId
 *        required: true
 *        schema:
 *          type: string
 *        description: id of task you want to update
 *    summary: update task from a user
 *    tags: [Task]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/TaskUpdate'
 *    responses:
 *      200:
 *        description: the task was succesfully updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/TaskUpdate'
 *
 */
router.put('/:taskId', tokenValidation, controller.update.bind(controller))

/**
 * @swagger
 * /task/{taskId}:
 *  delete:
 *    parameters:
 *      - in: header
 *        name: token
 *        required: true
 *        schema:
 *          type: string
 *        description: Token generado por JWT
 *      - in: path
 *        name: taskId
 *        required: true
 *        schema:
 *          type: string
 *        description: id of task you want to delete
 *    summary: delete a task from a user
 *    tags: [Task]
 *    responses:
 *      200:
 *        description: the task was succesfully deleted
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/TaskUpdate'
 *
 */
router.delete('/:taskId', tokenValidation, controller.remove.bind(controller))

export default router
