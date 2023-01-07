import express = require('express')
import morgan = require('morgan')
import cors = require('cors')

const app = express()

app.use(morgan('dev'))
app.use(cors())

export default app
