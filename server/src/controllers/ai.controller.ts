import { tryCatch } from "../middlewares/tryCatch.middleware"

import { Request, Response } from "express"
import { ProfileSearch } from "../services/profileSearch";


export const AiprofileSearch = tryCatch(
    async (req: Request, res: Response): Promise<void> => {
        const {userRequest} = req.body;

        if (!userRequest.trim()) {
            res.status(400).json({
                message: "cannot be empty, make some request"
            });
            return;
        }

        //Ai Profile Matching
        const profileSearch = await ProfileSearch(userRequest);

        console.log(profileSearch);



        res.status(200).json({
            message: "Request processed successfully"
        });
    }
)