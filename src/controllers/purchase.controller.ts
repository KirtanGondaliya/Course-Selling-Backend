import type { Request, Response } from "express";
import { createPurchaseService,getAllPurchaseCourseService } from "../service";
import { StatusCodes } from "http-status-codes";
import { ErrorResponse, SuccessResponse } from "../utils/common";

async function createPurchase(req:Request,res:Response){
    try{
        const response=await createPurchaseService({id:req.user?.userId as string}, req.body.courseId as string)
        return res.status(StatusCodes.OK).json(
            new SuccessResponse("Purchase created successfully",response,{})
        )
    }catch(error){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(
            new ErrorResponse("Something went wrong while creating purchase",{},{error})
        )
    }
}

async function getAllPurchaseCourse(req:Request,res:Response){
    try{
        const response=await getAllPurchaseCourseService(req.params.userId as string)
        return res.status(StatusCodes.OK).json(
            new SuccessResponse("Purchase course fetched successfully",response,{})
        )
    }catch(error){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(
            new ErrorResponse("Something went wrong while fetching purchase course",{},error)
        )
    }
}

export {
    createPurchase,
    getAllPurchaseCourse
}