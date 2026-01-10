import express from "express"
import { AiprofileSearch, profileSummary } from "../../controllers/ai.controller"

const aiRouter = express.Router()

//rest apis for AI
aiRouter.post('/', profileSummary)
aiRouter.post('/', AiprofileSearch)

export default aiRouter
