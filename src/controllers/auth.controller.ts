import type { Request, Response } from "express";
import {SuccessResponse,ErrorResponse} from "../utils/common"
import { StatusCodes } from "http-status-codes";
import { loginService, signUpService } from "../service/auth/auth.service";

async function signUp(req: Request, res: Response) {
    try{
        const {email,password,name,role}=req.body;
        const response=await signUpService({
            email,
            password,
            name,
            role
        })
        return res.status(StatusCodes.CREATED).json(new SuccessResponse("User created successfully",response,{}))
    }catch(error){
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(new ErrorResponse("Something went wrong",{},{error}))
    }
}

async function login(req: Request, res: Response) {
    try{
        const {email,password}=req.body;
        const response=await loginService({
            email,
            password
        })
        return res.status(StatusCodes.OK).json(new SuccessResponse("User logged in successfully",response,{}))
    }catch(error){
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(new ErrorResponse("Something went wrong",{},{error}))
    }
}

export {
    signUp,
    login
}