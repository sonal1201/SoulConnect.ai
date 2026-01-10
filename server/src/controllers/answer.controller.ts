import { tryCatch } from "../middlewares/tryCatch.middleware";
import { Request, Response } from "express";
import { Answer } from "../models/answer.model";

export const createAnswer = tryCatch(
    async (req: Request, res: Response) => {

        const { answers } = req.body;

        const { id } = req.params;

        if (!answers) {
            res
                .status(401)
                .json({
                    message: "Answers are required"
                })
        }

        const existAnswers = await Answer.findOne({ id });

        if (existAnswers) {
            res
                .status(402)
                .json({
                    messsage: "User alredy submited answers"
                })
        }

        const creatAnswer = await Answer.create(
            {
                userId: id,
                answer: answers
            }
        )

        res
            .status(200)
            .json(
                {
                    message: "Answers submitted succesfully",
                    Answers: creatAnswer
                }
            )

    }
)




