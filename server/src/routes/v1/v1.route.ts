import express from "express"
import userRouter from "./user.route"
import questionRouter from "./question.route"

const router = express.Router()

router.use('/user',userRouter)
router.use('/question',questionRouter)

export default router
