// packages
import express = require('express')
import morgan = require('morgan')
import cors = require('cors')
// routes
import userRoutes from './routes/user.routes'

const app = express()

// packages
app.use(morgan('dev'))
app.use(cors())
app.use(express.json())
// routes
app.use('/user', userRoutes)

export default app
