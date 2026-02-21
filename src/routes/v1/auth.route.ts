import express from "express"
import { login, signUp } from "../../controllers/auth.controller";
import { authSignUpRequestValidate, authLoginRequestValidate } from "../../middlewares";

const router=express.Router()

router.post('/signup',authSignUpRequestValidate,signUp)
router.post('/login',authLoginRequestValidate,login)

export default router;
