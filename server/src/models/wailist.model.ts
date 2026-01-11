import mongoose from "mongoose";

const waitList = new mongoose.Schema({
    email: {
        type: String,
        require: true,
        trim: true
    }
}, { timestamps: true })

export const JoinWaitlist = mongoose.model("JoinWaitlist", waitList)