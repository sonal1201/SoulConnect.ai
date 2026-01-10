import express from "express"
import userRouter from "./user.route"
import questionRouter from "./question.route"
import answerRouter from "./answer.route"

const v1Router = express.Router()

v1Router.use('/user', userRouter)
v1Router.use('/question', questionRouter)
v1Router.use('/answer', answerRouter)

export default v1Router
