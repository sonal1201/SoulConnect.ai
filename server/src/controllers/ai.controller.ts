import { tryCatch } from "../middlewares/tryCatch.middleware"

import { Request, Response } from "express"
import { ProfileSearch } from "../services/profileSearch";
import { profile } from "node:console";
import { User } from "../models/user.model";


export const AiprofileSearch = tryCatch(
    async (req: Request, res: Response): Promise<void> => {
        const { id } = req.params
        const { userRequest } = req.body;

        if (!userRequest.trim()) {
            res.status(400).json({
                message: "cannot be empty, make some request"
            });
            return;
        }

        const findUser = await User.findById(id);

        if (!findUser) {
            res.status(400).json({
                message: "Please Signin"
            })
        }

        const userLookingFor = findUser?.lookingFor as string

        //Ai Profile Matching
        const profileSearch = await ProfileSearch(userRequest, userLookingFor);

        const result = profileSearch.map((profile) => ({
            id: profile.id,
            score: profile.score,
            metadata: profile.payload?.metadata,
        }));

        console.log(result);

        const userIds = result.map(
            r => (r.metadata as { userId: string }).userId
        );

        const filterUserId = userIds.filter((userid) => userid !== id)

        const users = await User.find({
            _id: { $in: filterUserId }
        });


        console.log(userIds)


        res.status(200).json({
            message: "Request processed successfully",
            data: users
        });

    })