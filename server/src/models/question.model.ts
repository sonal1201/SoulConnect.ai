import mongoose from "mongoose"

const questionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

    responses: [{
        questionId: {
            type: String,
            required: true,
        },
        question: String,
        answer: {
            type: String,
            maxlength: 500,
        }
    }]

  

}, { timestamps: true })

export default mongoose.model("Question", questionSchema)
