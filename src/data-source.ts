import 'reflect-metadata'
import { DataSource } from 'typeorm'
require('dotenv').config()

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env['DB_HOST'] || '',
  port: +process.env['PORT'] || 0,
  username: process.env['DB_USER'] || '',
  password: process.env['DB_PASSWORD'] || '',
  database: process.env['DB_DATABASE'] || '',
  synchronize: true,
  logging: false,
  entities: ['src/models/*.ts'],
  migrations: [],
  subscribers: [],
})
