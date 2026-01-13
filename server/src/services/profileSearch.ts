import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai"
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters"
import dotenv from "dotenv"
import { qdrantClient } from "../config/qdrantVectordb"
import { textChucking } from "../utils/text_chunking"
import { ChunkEmbeddings } from "../utils/token_embedding"


dotenv.config()



export const ProfileSearch = async (userRequest: string) => {


    const profilechunk = await textChucking(userRequest)
    console.log(profilechunk)

    const seachEmbedd = await ChunkEmbeddings(profilechunk[0])

    console.log(seachEmbedd)

    // const vectorSimilaritySearch = await qdrantClient. 


}