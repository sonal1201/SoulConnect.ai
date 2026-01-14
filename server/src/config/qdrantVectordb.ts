import { QdrantClient } from '@qdrant/js-client-rest';
import { tryCatch } from '../middlewares/tryCatch.middleware';
import dotenv from "dotenv"

dotenv.config()

export const qdrantClient = new QdrantClient({
    url: 'https://171e6b65-e5af-45d3-a2db-355dd6e49fd2.us-west-2-0.aws.cloud.qdrant.io:6333',
    apiKey: process.env.QDRANT_API_KEY,
});

