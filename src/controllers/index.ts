import {signUp,login} from "./auth.controller";
import {createCourse,getCourses,updateCourse,deleteCourse,courseRevenueStats} from "./course.controller"
import {createLesson,getAllLessonsOfCourse} from "./lesson.controller"
import {createPurchase,getAllPurchaseCourse} from "./purchase.controller"

export {
    signUp,
    login,
    createCourse,
    getCourses,
    updateCourse,
    deleteCourse,
    createLesson,
    getAllLessonsOfCourse,
    createPurchase,
    getAllPurchaseCourse,
    courseRevenueStats
}