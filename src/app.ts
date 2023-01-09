// packages
import express = require('express')
import morgan = require('morgan')
import cors = require('cors')
// routes
import userRoutes from './routes/user.routes'
import taskRoutes from './routes/task.routes'
import sessionRoutes from './routes/session.routes'

const app = express()

// middlewares
app.use(morgan('dev'))
app.use(cors())
app.use(express.json())

// routes
app.use('/user', userRoutes)
app.use('/task', taskRoutes)
app.use('/session', sessionRoutes)

export default app
