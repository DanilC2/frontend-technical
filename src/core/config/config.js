import dotenv from "dotenv"
dotenv.config()

export const ENV = {
    PORT:process.env.PORT,
    token_secret:process.env.SECRET
}