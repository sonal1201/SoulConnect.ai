import { Request, Response, NextFunction } from "express"

interface ErrorResponse {
    message: string;
}

type AsyncRequestHandler = (req: Request, res: Response, next: NextFunction) => Promise<void>;

export const tryCatch = (handler: AsyncRequestHandler) => {
    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            await handler(req, res, next)
        } catch (error) {
            console.log(error)
            res.status(500).json({
                message: (error as Error).message,
            })
        }
    }
}