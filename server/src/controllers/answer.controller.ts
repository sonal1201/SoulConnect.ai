import { tryCatch } from "../middlewares/tryCatch.middleware";
import { Request, Response } from "express";
import { Answer } from "../models/answer.model";
import { AiprofileSummary } from "../utils/AiprofileSummary";
import { User } from "../models/user.model";

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

        const answersofUser = creatAnswer.answer
            .map((item: { question: string; answer: string }, index: number) => {
                return `${index + 1}. Q: ${item.question}\n   A: ${item.answer}`;
            })
            .join("\n\n");

        console.log(answersofUser)

        const aiprofileSummary = await AiprofileSummary(answersofUser)

        console.log(aiprofileSummary)

        await User.findByIdAndUpdate({
            _id: id
        }, {
            profile_summary: aiprofileSummary
        })

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




