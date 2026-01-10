import { tryCatch } from "../middlewares/tryCatch.middleware"
import { Request, Response } from "express"
import { User } from "../models/user.model";


// create 
export const createUserProfile = tryCatch(
    async (req: Request, res: Response) => {
        const { email, fullname, gender, lookingFor, age, profile_summary } = req.body;
        console.log(email, fullname, gender, lookingFor, age, profile_summary)
        if (!email || !fullname || !gender || !lookingFor || !age || !profile_summary) {
            res.status(400).json({
                message: "All fields are required"
            })
            return;
        }

        const existingUser = await User.findOne({
            email
        })

        console.log(existingUser)

        if (!existingUser) {
            console.log("inside")
            const result = await User.create({
                email,
                fullname,
                gender,
                lookingFor,
                age,
                profile_summary
            })

            console.log(result)
        }

        res.status(200).json({
            message: "User Loggedin Successfully",
            data: existingUser
        })
    }
)

export const getUserProfile = tryCatch(
    async (req: Request, res: Response) => {

    }
)

export const deleteUserProfile = tryCatch(
    async (req: Request, res: Response) => {

    }
)

export const updateUserProfile = tryCatch(
    async (req: Request, res: Response) => {
        const { fullname, gender, lookingFor, age } = req.body;

        if (!fullname.trim() || !gender || !lookingFor || !age) {
            res.status(400).json({
                message: "All fields are Requried"
            });
            return;
        }
    }
)

export const healthCheck = tryCatch(
    async (req: Request, res: Response) => {
        res.status(200).json({
            message: "sever is up"
        })
    }
)