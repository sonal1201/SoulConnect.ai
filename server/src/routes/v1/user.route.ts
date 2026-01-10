import express from "express"
import { createUserProfile, deleteUserProfile, getUserProfile, updateUserProfile } from "../../controllers/user.controller"

const userRouter = express.Router()

//rest apis of user
userRouter.post('/', createUserProfile)
userRouter.get('/:id', getUserProfile)
userRouter.put('/:id', updateUserProfile)
userRouter.delete('/:id', deleteUserProfile)

export default userRouter
