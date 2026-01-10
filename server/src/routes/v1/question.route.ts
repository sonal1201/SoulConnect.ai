import express from "express"
import { addQuestions, getQuestions, updateAnswers } from "../../controllers/question.controller"

const questionRouter = express.Router()

//rest apis of questions
questionRouter.post('/', addQuestions)
questionRouter.get('/', getQuestions)

export default questionRouter
