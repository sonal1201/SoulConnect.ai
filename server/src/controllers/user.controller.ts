import { tryCatch } from "../middlewares/tryCatch.middleware"
import { Request, Response } from "express"
import { User } from "../models/user.model";


// create----------
export const createUserProfile = tryCatch(
    async (req: Request, res: Response): Promise<void> => {
        const { email, fullname, gender, lookingFor, age } = req.body;

        // Field validation
        if (!email || !fullname || !gender || !lookingFor || !age) {
            res.status(400).json({
                message: "All fields are required",
            });
            return
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            res.status(200).json({
                message: "Welcome back",
                data: existingUser,
            });
            return
        }

        // Create new user
        const newUser = await User.create({
            email,
            fullname,
            gender,
            lookingFor,
            age,
            isOnboarded: true
        });

        res.status(201).json({
            message: "User profile created successfully",
            data: newUser,
        });
    }
);


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

export const updateUserProfile = tryCatch(async (req: Request, res: Response) => {
    const { id } = req.params;

    const user = await User.findByIdAndUpdate(
        id,
        {
            ...req.body,
            isOnboarded: true,
        },
        { new: true, runValidators: true }
    );

    if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
    }

    res.status(200).json({
        message: "Onboarding completed",
        data: user,
    });
});

export const healthCheck = tryCatch(
    async (req: Request, res: Response) => {
        res.status(200).json({
            message: "sever is up"
        })
    }
)

export const checkUser = tryCatch(async (req: Request, res: Response) => {
    const { email } = req.body;

    if (!email) {
        res.status(400).json({ message: "Email required" });
        return;
    }

    let user = await User.findOne({ email });

    if (!user) {
        user = await User.create({ email });
    }

    res.status(200).json({
        userId: user._id,
        isOnboarded: user.isOnboarded,
        questionAnswered: user.questionAnswered,
    });
});
