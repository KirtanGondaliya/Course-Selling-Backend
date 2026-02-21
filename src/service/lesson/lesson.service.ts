import { CourseRepository, LessonRepository, UserRepository } from "../../repository";
import { ErrorResponse } from "../../utils/common";


const lessonRepository=new LessonRepository()
const courseRepository=new CourseRepository()
const userRepository=new UserRepository()

async function createLessonService(userId:string,data:any){
    try{
        const userExists=await userRepository.findById(userId)
        if(!userExists){
            throw new ErrorResponse("Instructor not found",{},{})
        }
        const courseExists=await courseRepository.findById(data.courseId)
        if(!courseExists){
            throw new ErrorResponse("Course not found",{},{})
        }
        if(courseExists.instructorId !== userId){
            throw new ErrorResponse("You are not authorized to create lesson in this course",{},{})
        }
        const response = await lessonRepository.create(data)
        return response
    }catch(error){
        throw new ErrorResponse("Something went wrong while creating lesson",{},error)
    }
}

async function getAllLessonsWithCourseService(courseId:string){
    try{
        const courseExists=await courseRepository.findById(courseId)
        if(!courseExists){
            throw new ErrorResponse("Course not found",{},{})
        }
        const response=await courseRepository.findCoursesWithLesson(courseId)
        return response
    }catch(error){
        throw new ErrorResponse("Something went wrong while fetching lessons",{},error)
    }
}

export {
    createLessonService,
    getAllLessonsWithCourseService
}