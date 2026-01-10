import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
        trim: true,
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },

    gender: {
        type: String,
        enum: ["Male", "Female", "Other"],
        required: true,
    },

    lookingFor: {
        type: String,
        enum: ["Male", "Female", "Everyone"],
        default: "Everyone",
    },

    age: {
        type: Number,
        required: true,
    },

    profile_summary: {
        type: String,
        required: true,
        trim: true,
    },

}, { timestamps: true });

export default mongoose.model("User", userSchema);
