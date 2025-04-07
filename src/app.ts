import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import connectDB from './config/connectDb'

dotenv.config()

const app = express()

// Middleware
app.use(cors())
app.use(express.json())
app.use(cookieParser())

// Database connection
connectDB()

export default app
