import express from "express"
import userRouter from "./user.route"
import questionRouter from "./question.route"

const v1Router = express.Router()

v1Router.use('/user', userRouter)
v1Router.use('/question', questionRouter)

export default v1Router
