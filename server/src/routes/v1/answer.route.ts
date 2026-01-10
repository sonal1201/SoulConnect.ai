import express from "express"
import { createAnswer } from "../../controllers/answer.controller"

const answerRouter = express.Router()

//rest apis of questions
answerRouter.post('/:id', createAnswer)


export default answerRouter
