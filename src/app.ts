// packages
import express = require('express')
import morgan = require('morgan')
import cors = require('cors')
// routes
import userRoutes from './routes/user.routes'
import taskRoutes from './routes/task.routes'

const app = express()

// packages
app.use(morgan('dev'))
app.use(cors())
app.use(express.json())

// routes
app.use('/user', userRoutes)
app.use('/task', taskRoutes)

export default app
