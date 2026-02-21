import express from "express"
import { tokenVerfication,createLessonValidateRequest } from "../../middlewares"
import { createLesson,getAllLessonsOfCourse } from "../../controllers"

const router=express.Router({mergeParams:true})

router.post('/',tokenVerfication,createLessonValidateRequest,createLesson)
router.get('/',getAllLessonsOfCourse)

export default router