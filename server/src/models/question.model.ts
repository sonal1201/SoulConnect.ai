import mongoose from "mongoose"

const questionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true,
    },
    options: {
        type: [String],
        default: [],
    },

}, { timestamps: true })

export const Question = mongoose.model("Question", questionSchema)
