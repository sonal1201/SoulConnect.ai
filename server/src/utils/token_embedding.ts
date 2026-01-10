import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai"
import dotenv from "dotenv"
import { MongoClient } from "mongodb"

dotenv.config()

type ProfileChuckEmbedding = {
    profilechunks: string[]
}

export const profileChuckEmbedding = async ({ profilechunks }: ProfileChuckEmbedding) => {
    const profileEmbedding = new GoogleGenerativeAIEmbeddings({
        model: "text-embedding-004",
        apiKey: process.env.GOOGLE_API_KEY
    })

    const client = new MongoClient(process.env.MONGODB_ATLAS_URI || "");
}