import Express from 'express'
import dotenv from 'dotenv'
import { ENV } from './core/config/config.js'
import cookieParser from 'cookie-parser'
import cors from "cors"
import Routes from "./routes/authroutes.js"

dotenv.config()

const App = Express()


App.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

App.use(Express.json())
App.use(Express.urlencoded({ extended: true }))
App.use(cookieParser())


App.use("/Auth", Routes)


App.listen(ENV.PORT, () => {
  console.log("server start success");
})
