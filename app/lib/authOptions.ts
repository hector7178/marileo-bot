import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import conn from "./db.js";
import User from "../models/user.js"


export const authOptions:AuthOptions  = {
  
    providers: [
      CredentialsProvider({
          
          name: "Credentials",
         
          credentials: {
            usuario: { label: "Username", type: "text", placeholder: "jsmith" },
            contraseña: { label: "Password", type: "password" }
          },
          async authorize(credentials, req) {
  
            await conn()
            
  
            const userFound= await User?.findOne({usuario:credentials?.usuario})
             if (!userFound){
              throw new Error("credenciales invalidas usuario")
             }
             if (!(userFound?.contraseña === credentials?.contraseña)){
              throw new Error("credenciales invalidas contraseña")
             }
             return userFound as any
            
          }
        })
    ],
    callbacks:{
      jwt({account,token,user,profile,session}):any{
        if(user) token.user=user;
        return token 
  
      },
      session({session,token}):any{
        session.user=token.user
        return session
      }
    },
    pages:{
      signIn:'/login'
    },
    secret: process.env.JWT_SECRET,
    
  
  }