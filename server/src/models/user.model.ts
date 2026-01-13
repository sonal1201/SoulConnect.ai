import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },

        fullname: {
            type: String,
            trim: true,
        },

        gender: {
            type: String,
            enum: ["Male", "Female", "Other"],
        },

        lookingFor: {
            type: String,
            enum: ["Male", "Female", "Everyone"],
            default: "Everyone",
        },

        age: {
            type: Number,
        },

        profile_summary: {
            type: String,
            trim: true,
        },

        isOnboarded: {
            type: Boolean,
            default: false,
        },
        questionAnswered: {
            type: Boolean,
            default: false,
        },

    },
    { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
