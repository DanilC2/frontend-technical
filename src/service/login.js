import { users } from "../db/db.js"
import { ENV } from "../core/config/config.js"
import jwt from "jsonwebtoken"
export class LoginService{
   async Login(data){
        try {
            const Data = users.find((v)=>v.email == data.email)
            if(!Data) throw new Error("invalid user email")
            if(Data.password !== data.password) throw new Error("password dosent match")  
            const token = jwt.sign(Data,ENV.token_secret,{ expiresIn: "7d" })
            return {token,Data}
        } catch (error) {
            throw error
        }
    }

    verifyToken(token){
        try {
            const payload = jwt.verify(token,ENV.token_secret)
            return{
                payload
            }
        } catch (error) {
            throw error 
        }
    }
}