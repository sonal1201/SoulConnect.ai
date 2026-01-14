import express from "express"
import { AiprofileSearch } from "../../controllers/ai.controller"

const aiRouter = express.Router()

aiRouter.post('/:id', AiprofileSearch)

export default aiRouter
