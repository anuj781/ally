import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import path from 'path'
import { fileURLToPath } from 'url'

// Setup __dirname in ES modules
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const port = process.env.PORT || 9988

// Connect to DB
import connectToDb from './config/db.js'
connectToDb()

// Middlewares
app.use(cors())
app.use(express.json())

// Routes
import enquiryRoutes from './routes/enquiryRoutes.js'
app.use('/enquiry', enquiryRoutes)

// Serve React build from /client (Vite output)
app.use(express.static(path.join(__dirname, 'client')))
app.get('*', (_, res) => {
  res.sendFile(path.join(__dirname, 'client', 'index.html'))
})

// Start server
app.listen(port, () => {
  console.log(`✅ Server running at http://localhost:${port}`)
})
