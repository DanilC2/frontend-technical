import { LoginService } from "../service/login.js";

const AuthService = new LoginService()

export class AuthController{
   Login = async(req,res)=>{
    try {
        const data = req.body
        const {token,Data} = await AuthService.Login(data)
         res.cookie("AccessToken",token,{
        httpOnly:true,
        secure:process.env.NODE_ENV === "production",
        sameSite:"lax",
        maxAge: 900000,
        path:"/"
        })
        res.status(200).json({Data,token}) 
    } catch (error) {
        res.status(501).json({error:error.message||"failed to login"})
    }
   }

   Verify = async(req,res)=>{
      try {
       const AccessToken = req.cookies.AccessToken  
       const data = AuthService.verifyToken(AccessToken)
       res.status(200).json({data:data.payload,AccessToken})
      } catch (error) {
        res.status(501).json({error:error.message||"failed to verify"})
      }
   }

   Logout = async(req,res)=>{
     res.clearCookie("AccessToken", { path: "/" });
     res.status(200).json({message:"success"})
   }
}