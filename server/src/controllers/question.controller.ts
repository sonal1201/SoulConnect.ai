import { tryCatch } from "../middlewares/tryCatch.middleware"
import { Request, Response } from "express"
import { Question } from "../models/question.model";

// ✅ Get all questions
export const getQuestions = tryCatch(
    async (req: Request, res: Response) => {

        const question = await Question.find();

        res
            .status(200)
            .json(
                {
                    messgae: "Questions fetched successfully",
                    data: question
                }
            )
            
    }
)

// ✅ Add a new question
export const addQuestions = tryCatch(
    async (req: Request, res: Response) => {

        const { question, options } = req.body;

        if (!question || !options) {
            res
                .status(401)
                .json({
                    messagge: "Questin and answer are required"
                })
        }

        const QuestionExist = await Question.findOne({ question })

        if (QuestionExist) {
            res
                .status(401)
                .json({
                    message: "Question already Exist"
                })
        }

        const NewQuestion = await Question.create(
            {
                question,
                options
            }
        )

        await NewQuestion.save()

        res
            .status(200)
            .json({
                message: "Question created Successfully",
                Question: {
                    NewQuestion
                }
            })

    }
)

//update all answers of the question Business logic
export const updateAnswers = tryCatch(
    async (req: Request, res: Response) => {

    }
)

