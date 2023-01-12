// packages
import express = require('express')
import morgan = require('morgan')
import cors = require('cors')

// Swagger
import swaggerUI from 'swagger-ui-express'
import swaggerJsDoc from 'swagger-jsdoc'
import { options } from './configs/swagger.config'

// routes
import userRoutes from './routes/user.routes'
import taskRoutes from './routes/task.routes'
import sessionRoutes from './routes/session.routes'

const app = express()

// middlewares
app.use(morgan('dev'))
app.use(cors())
app.use(express.json())

// documentation
const specs = swaggerJsDoc(options)

// routes
app.use('/user', userRoutes)
app.use('/task', taskRoutes)
app.use('/session', sessionRoutes)
app.use('/docs', swaggerUI.serve, swaggerUI.setup(specs))

export default app
