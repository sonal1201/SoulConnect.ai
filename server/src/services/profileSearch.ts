import dotenv from "dotenv"
import { qdrantClient } from "../config/qdrantVectordb"
import { textChucking } from "../utils/text_chunking"
import { ChunkEmbeddings } from "../utils/token_embedding"


dotenv.config()



export const ProfileSearch = async (userRequest: string , userLookingFor: string) => {


    const profilechunk = await textChucking(userRequest)
    console.log(profilechunk)

    const seachEmbedd = await ChunkEmbeddings(profilechunk[0])

    console.log(seachEmbedd)

    const results = await qdrantClient.search("soul-connect", {
        vector: seachEmbedd,
        limit: 3,
        with_payload: true,
        with_vector: false,
        filter: {
            must: [
                {
                    key: "metadata.gender",
                    match: { value: userLookingFor },
                },
            ],
        },
    });

    return results;

}