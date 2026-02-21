import express from "express"
import authRouter from "./auth.route"
import courseRouter from './course.route'
import lessonRouter from './lesson.route'
import purchaseRouter from './purchase.route'

const router=express.Router()

router.use('/auth',authRouter)
router.use('/courses',courseRouter)
router.use('/courses/:courseId/lessons',lessonRouter)
router.use('/purchase',purchaseRouter)

export default router;