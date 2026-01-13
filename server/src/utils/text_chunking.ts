import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters"


export const textChucking = async (profileSummary: string) => {
    const splitter = new RecursiveCharacterTextSplitter({
        chunkSize: 1000, chunkOverlap: 200, separators: [
            "\n\n",
            "\n",
            " ",
            ".",
            ",",
            "\u200b",  // Zero-width space
            "\uff0c",  // Fullwidth comma
            "\u3001",  // Ideographic comma
            "\uff0e",  // Fullwidth full stop
            "\u3002",  // Ideographic stop
            "",
        ],
    })

    const profilechunk = await splitter.splitText(profileSummary)

    return profilechunk;

}