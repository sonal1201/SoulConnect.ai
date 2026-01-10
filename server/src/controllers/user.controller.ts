import { tryCatch } from "../middlewares/tryCatch.middleware"
import { Request, Response } from "express"
import User from "../models/user.model";

// create 
export const createUserProfile = tryCatch(
    async (req: Request, res: Response): Promise<void> => {
        const { email } = req.body;
        console.log(email)

        if (!email.trim()) {
            res.status(400).json({
                message: "Email is required"
            })
        }

        const existingUser = await User.find({
            email
        })
        console.log(existingUser)

        if (!existingUser) {
            console.log("inside")
            await User.create({
                email
            })
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