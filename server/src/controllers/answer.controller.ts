import { tryCatch } from "../middlewares/tryCatch.middleware";
import { Request, Response } from "express";
import { Answer } from "../models/answer.model";
import { AiprofileSummary } from "../utils/AiprofileSummary";
import { User } from "../models/user.model";
import { textChucking } from "../utils/text_chunking";
import { ChunkEmbeddings } from "../utils/token_embedding";
import { QdrantVectorStore } from "@langchain/qdrant";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { Document } from "@langchain/core/documents";
import { qdrantClient } from "../config/qdrantVectordb";

const embedder = new GoogleGenerativeAIEmbeddings({
    model: "text-embedding-004",
    apiKey: process.env.GOOGLE_API_KEY
})

export const createAnswer = tryCatch(async (req: Request, res: Response) => {
    const { answers } = req.body;
    const { id } = req.params;

    if (!id) {
        res.status(400).json({ message: "UserId is required" });
        return;
    }

    if (!answers || !Array.isArray(answers) || answers.length === 0) {
        res.status(400).json({ message: "Answers are required" });
        return;
    }

    const existingAnswers = await Answer.findOne({ userId: id });


    if (existingAnswers) {
        res.status(409).json({
            message: "User already submitted answers",
        });
        return;
    }


    const createdAnswer = await Answer.create({
        userId: id,
        answer: answers,
    });


    const answersOfUser = answers
        .map(
            (item: { question: string; answer: string }, index: number) =>
                `${index + 1}. Q: ${item.question}\n   A: ${item.answer}`
        )
        .join("\n\n");

    let aiProfileSummary = "";

    try {
        aiProfileSummary = await AiprofileSummary(answersOfUser);
    } catch (err) {
        console.error("AI summary failed:", err);
    }

    const currUser = await User.findById(id);

    console.log(currUser)

    const profilechunks = await textChucking(aiProfileSummary)
    console.log(profilechunks)

    // const storeEmbedd = await ChunkEmbeddings(profilechunk[0])
    // console.log(storeEmbedd);

    // //vectorStore 

    // const vectorStore = await QdrantVectorStore.fromDocuments(
    //     aiProfileSummary,          // Document[]
    //     embedder,             // Embeddings instance
    //     {
    //         url: process.env.QDRANT_URL,
    //         collectionName: "soul-connect",
    //     }
    // );

    const documents = profilechunks.map(
        (chunk, index) =>
            new Document({
                pageContent: chunk,
                metadata: {
                    userId: id,
                    gender: currUser?.gender,
                    chunkIndex: index,
                    type: "profile_summary",
                },
            })
    );

    console.log(documents);

    const vectorStore = await QdrantVectorStore.fromDocuments(
        documents,
        embedder,
        {
            url: process.env.QDRANT_URL,
            collectionName: "soul-connect",
        }

    );

    await qdrantClient.createPayloadIndex("soul-connect", {
        field_name: "metadata.gender",
        field_schema: "keyword",
    });




    await User.findByIdAndUpdate(
        id,
        {
            profile_summary: aiProfileSummary,
            questionAnswered: true,
        },
        { new: true }
    );

    res.status(201).json({
        message: "Answers submitted successfully",
        data: createdAnswer,
    });
});
