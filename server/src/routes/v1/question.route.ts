import express from "express"
import { getQuestions, updateAnswers } from "../../controllers/question.controller"

const questionRouter = express.Router()

//rest apis of questions
questionRouter.post('/', updateAnswers)
questionRouter.get('/', getQuestions)

export default questionRouter
