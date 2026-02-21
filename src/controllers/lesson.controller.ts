import type { Request,Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ErrorResponse, SuccessResponse } from "../utils/common";
import { createLessonService, getAllLessonsWithCourseService } from "../service";

async function createLesson(req:Request,res:Response){
    try{
        const response = await createLessonService(req.user?.userId as string,req.body)
        return res.status(StatusCodes.CREATED).json(new SuccessResponse("Lesson created successfully",response,{}))
    }catch(error){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(new ErrorResponse("Something went wrong while creating lesson",{},error))
    }
}

async function getAllLessonsOfCourse(req:Request,res:Response){
    try{
        const {courseId}=req.params
        const lessons=await getAllLessonsWithCourseService(courseId as string)
        return res.status(StatusCodes.OK).json(new SuccessResponse("Lessons fetched successfully",lessons as object,{}))
    }catch(error){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(new ErrorResponse("Something went wrong while fetching lessons",{},error))
    }
}

export {
    createLesson,
    getAllLessonsOfCourse
}