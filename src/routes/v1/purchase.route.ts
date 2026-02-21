import express from "express"
import { tokenVerficationForStudent,purchaseRequestValidate } from "../../middlewares"
import { createPurchase,getAllPurchaseCourse } from "../../controllers"

const router=express.Router()

router.post('/',tokenVerficationForStudent,purchaseRequestValidate,createPurchase)
router.get('/:userId',tokenVerficationForStudent,getAllPurchaseCourse)

export default router