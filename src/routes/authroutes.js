import express from "express"
import { AuthController } from "../controller/Auth.js"
const Router = express.Router()

const authcontroller = new AuthController()

Router.post("/login",authcontroller.Login)
Router.get("/verify",authcontroller.Verify)
Router.post("/logout",authcontroller.Logout)

export default Router