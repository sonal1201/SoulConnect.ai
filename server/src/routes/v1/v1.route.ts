import express from "express"
import userRouter from "./user.route"
import questionRouter from "./question.route"
import aiRouter from "./ai.route"
import answerRouter from "./answer.route"
import { joinWait } from "../../controllers/joinWaitlist.controller"

const v1Router = express.Router()

v1Router.use('/user', userRouter)
v1Router.use('/question', questionRouter)
v1Router.use('/ai',  aiRouter)
v1Router.use('/answer', answerRouter)

// joinWait List
v1Router.post('/join-waitlist',joinWait)

export default v1Router
