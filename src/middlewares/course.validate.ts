import type { NextFunction,Request,Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ErrorResponse } from "../utils/common";
import { courseSchema } from "../validators";
import { verifyToken } from "../service";
import { db } from "../config";

function courseValidateRequest(req:Request,res:Response,next:NextFunction){
    try{
        const request=courseSchema.safeParse(req.body)
        if(!request.success){
            return res.status(StatusCodes.BAD_REQUEST).json(new ErrorResponse("Invalid request",{},request.error))
        }
        next()
    }catch(error){
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(new ErrorResponse("Something went wrong",{},error))
    }
}

async function courseUpdateValidateRequest(req:Request,res:Response,next:NextFunction){
    try{
        const request=courseSchema.safeParse(req.body)
        if(!request.success){
            return res.status(StatusCodes.BAD_REQUEST).json(new ErrorResponse("Invalid request",{},request.error))
        }
        next()
    }catch(error){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(new ErrorResponse("Something went wrong",{},error))
    }
}

export {
    courseValidateRequest,
    courseUpdateValidateRequest
}