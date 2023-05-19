import express from "express";
const app = express()
import cors from 'cors';
import cookieParser from "cookie-parser";
app.use(express.json())

app.use(express.urlencoded({ extended: true }))

app.use(cors())

app.use(cookieParser())

export default app