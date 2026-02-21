import type {Request,Response, NextFunction } from "express";
import { lessonSchema } from "../validators";
import { StatusCodes } from "http-status-codes";
import { ErrorResponse } from "../utils/common";

function createLessonValidateRequest(req:Request,res:Response,next:NextFunction){
    try{
        const response = lessonSchema.safeParse(req.body)
        if(!response.success){
            return res.status(StatusCodes.BAD_REQUEST).json(new ErrorResponse("Invalid request",{},response.error))
        }
        next()
    }catch(error){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(new ErrorResponse("Invalid request",{},error))
    }
}

export {
    createLessonValidateRequest
}