import { Router } from 'express'
import { UserService } from '../services/user.service'
import { TokenService } from '../services/token.service'
import { SessionController } from '../controllers/session.controller'
import { tokenValidation } from '../middleware/jwt'

const router = Router()
const controller = new SessionController(new UserService(), new TokenService())

/**
 * @swagger
 * components:
 *  schemas:
 *    UserSignUp:
 *      type: object
 *      properties:
 *        username:
 *          type: string
 *          description: the name of the new User
 *        email:
 *          type: string
 *          description: the email of the new User
 *        password:
 *          type: string
 *          description: the password of the new User
 *      required:
 *        - username
 *        - email
 *        - password
 *      example:
 *        username: Tyranic Snowball
 *        email: snowball@animalFarm.com
 *        password: windmill
 *
 *    UserSignIn:
 *      type: object
 *      properties:
 *        email:
 *          type: string
 *          description: the email of the already created User
 *        password:
 *          type: string
 *          description: the password of the already created User
 *      required:
 *        - email
 *        - password
 *      example:
 *        email: snowball@animalFarm.com
 *        password: windmill
 *
 *    Invalid Email:
 *      type: object
 *      properties:
 *        msg:
 *          type: string
 *          description: Email already exists
 *
 *    Invalid Credentials:
 *      type: object
 *      properties:
 *        msg:
 *          type: string
 *          description: Email or Password is wrong
 *
 *  parameters:
 *    singUp:
 *      in: path
 *      username: string
 *      email: string
 *      password: string
 *      required: true
 *      schema:
 *        type: string
 *      description: the sign up
 *
 *    singIn:
 *      in: path
 *      email: string
 *      password: string
 *      required: true
 *      schema:
 *        type: string
 *      description: the sign in
 */

/**
 * @swagger
 * /session/singup:
 *  post:
 *    summary: Sign Up with a new User
 *    tags: [Session]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/UserSignUp'
 *    responses:
 *      200:
 *        description: the user was succesfully created
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/UserSignUp'
 *      400:
 *        description: Invalid Email
 *      500:
 *        description: Server Error
 *
 */
router.post('/singup', controller.singup.bind(controller))

/**
 * @swagger
 * /session/signin:
 *  post:
 *    summary: Sign In with a already created User
 *    tags: [Session]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/UserSignIn'
 *    responses:
 *      200:
 *        description: the user was succesfully created
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/UserSignIn'
 *      400:
 *        description: Invalid Credentials
 *      500:
 *        description: Server Error
 *
 */
router.post('/signin', controller.signin.bind(controller))

/**
 * @swagger
 * /session/logout:
 *  post:
 *    summary: Logout of the current session
 *    tags: [Session]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/UserSignIn'
 *    responses:
 *      200:
 *        description: the user was succesfully logged out
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/UserSignIn'
 *      400:
 *        description: Invalid Credentials
 *      500:
 *        description: Server Error
 *
 */
router.post('/logout', controller.logout.bind(controller))

export default router
