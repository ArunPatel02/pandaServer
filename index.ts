import express, { Express, Request, Response } from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { connectDB } from './database/connection/index.js'
import route from './routes/index.js'
import secuteRoute from './routes/secureRoutes.js'
import { validateUser } from './middelware/index.js'
dotenv.config()
const PORT = process.env.PORT

const app: Express = express()

app.use(cors())

app.use(express.json())

app.use("/api", route)
app.use("/api/auth", validateUser, secuteRoute)

app.listen(PORT, () => {
    console.log("App is listening on port", PORT)
    connectDB()
})