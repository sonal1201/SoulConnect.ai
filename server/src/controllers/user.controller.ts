import { tryCatch } from "../middlewares/tryCatch.middleware"
import { Request, Response } from "express"

// create 
export const createUserProfile = tryCatch(
    async (req: Request, res: Response) => {

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

    }
)

export const healthCheck = tryCatch(
    async (req: Request, res: Response) => {
        res.status(200).json({
            message: "sever is up"
        })
    }
)