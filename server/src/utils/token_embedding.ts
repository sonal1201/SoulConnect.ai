import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai"
import dotenv from "dotenv"
import { MongoClient } from "mongodb"

dotenv.config()



export const ChunkEmbeddings = async (textChunks: string) => {
    const chunkEmbedding = new GoogleGenerativeAIEmbeddings({
        model: "text-embedding-004",
        apiKey: process.env.GOOGLE_API_KEY
    })

    const seachEmbedd =  chunkEmbedding.embedQuery(textChunks)


    return seachEmbedd;

}