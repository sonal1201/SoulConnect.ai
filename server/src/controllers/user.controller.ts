import { tryCatch } from "../middlewares/tryCatch.middleware"
import { Request, Response } from "express"
import { User } from "../models/user.model";


// create----------
export const createUserProfile = tryCatch(
    async (req: Request, res: Response) => {
        const { email, fullname, gender, lookingFor, age } = req.body;

        //field check
        if (!email || !fullname || !gender || !lookingFor || !age ) {
            res.status(400).json({
                message: "All fields are required"
            })
            return;
        }

        // find the user in Db
        const existingUser = await User.findOne({
            email
        })

        // console.log(existingUser)

        let result;
        if (!existingUser) {
            console.log("inside")
            result = await User.create({
                email,
                fullname,
                gender,
                lookingFor,
                age
            })

            console.log(result)
        }

        res.status(201).json({
            message: "User Loggedin Successfully",
            data: result
        })
    }
)

// get user profile----------
export const getUserProfile = tryCatch(
    async (req: Request, res: Response) => {
        const { id } = req.params;

        if (!id) {
            res.status(400).json({
                message: "UserId is required"
            })
            return
        }

        const findUser = await User.findOne({
            _id: id
        })

        if (!findUser) {
            res.status(404).json({
                message: "User Not Found"
            })
            return
        }

        res.status(200).json({
            message: "User profile is Fetched",
            data: findUser
        })
    }
)

//Delete User----------
export const deleteUserProfile = tryCatch(
    async (req: Request, res: Response) => {
        const { id } = req.params;

        if (!id) {
            res.status(400).json({
                message: "UserId is required"
            })
            return
        }

        const findUser = await User.findById({
            _id: id
        })

        console.log(findUser)
        console.log("helddvdflo")


        if (!findUser) {
            res.status(404).json({
                message: "User Not Found"
            })
            return
        }

        const deleteUser = await User.findByIdAndDelete({
            _id: id
        })

        res.status(200).json({
            message: "User Deleted Successfully",
        })
    }
)

export const updateUserProfile = tryCatch(
    async (req: Request, res: Response) => {
        // const { lookingFor, age } = req.body;

        // if (!fullname.trim() || !gender || !lookingFor || !age) {
        //     res.status(400).json({
        //         message: "All fields are Requried"
        //     });
        //     return;
        // }
    }
)

export const healthCheck = tryCatch(
    async (req: Request, res: Response) => {
        res.status(200).json({
            message: "sever is up"
        })
    }
)