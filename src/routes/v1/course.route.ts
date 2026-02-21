import express from "express"
import { createCourse, getCourses, updateCourse,deleteCourse, courseRevenueStats } from "../../controllers";
import { tokenVerfication } from "../../middlewares";
import { courseUpdateValidateRequest, courseValidateRequest } from "../../middlewares/course.validate";

const router=express.Router();

router.post('/',tokenVerfication,courseValidateRequest,createCourse)
router.get('/',getCourses);
router.patch('/:id',tokenVerfication,courseUpdateValidateRequest,updateCourse)
router.delete('/:id',tokenVerfication,deleteCourse)
router.get('/:courseId/stats',tokenVerfication,courseRevenueStats)


export default router