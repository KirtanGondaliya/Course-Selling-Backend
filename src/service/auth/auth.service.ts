import jwt from "jsonwebtoken";
import { ServerConfig } from "../../config";
import {UserRepository} from "../../repository"
import { ErrorResponse } from "../../utils/common";
import bcrypt from "bcrypt"


type Role = "INSTRUCTOR" | "STUDENT"

interface TokenPayload{
    userId:string,
    role:Role
}

const userRepository=new UserRepository()

async function signUpService(data:any){
    try {
        const user=await userRepository.findByEmail(data.email);
        if(user){
           throw new ErrorResponse("User already exists",{},{})
        }
        const hashPassword=await bcrypt.hash(data.password,10)
        const response=await userRepository.create({
            email:data.email,
            password:hashPassword,
            name:data.name,
            role:data.role
        })
        const {password,...safeResponse}=response
        return safeResponse
    } catch (error) {
        throw error
    }
}

async function loginService(data:any){
    try{
        const user=await userRepository.findByEmail(data.email);
        if(!user){
            throw new ErrorResponse("User not found",{},{});
        }
        const isPasswordMatch=await bcrypt.compare(data.password,user.password);
        if(!isPasswordMatch){
            throw new ErrorResponse("Invalid password",{},{});
        }
        const token=generateToken({userId:user.id,role:user.role as Role});
        return {token}
    }catch(error){
        throw new ErrorResponse("Something went wrong",{},{});
    }
}


function generateToken(payload:TokenPayload):string{
    return jwt.sign(payload,ServerConfig.JWT_SECRET!,{expiresIn:'1d'})
}

function verifyToken(token:string){
    return jwt.verify(token,ServerConfig.JWT_SECRET!) as TokenPayload
}

export {
    generateToken,
    verifyToken,
    signUpService,
    loginService
}

