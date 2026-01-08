# SoulConnect.ai - AI Partner Matching Application

This document outlines the user flow and architecture for an anonymous, AI-driven partner matching platform.

## 1. System Overview

The platform connects users based on personality compatibility and preferences using Large Language Models (LLM) and Vector Search. Users remain anonymous until a mutual agreement reveals their identities.

## 2. User Flows

### A. Male User Flow (Onboarding)

1.  **Registration**: User signs up.
2.  **Interactive Questionnaire**:
    - The system (LLM) initiates a conversation, asking **10 questions** to understand the user's personality, interests, and values.
3.  **Profile Generation & Storage**:
    - The LLM synthesizes the user's responses.
    - The summarized profile is converted into a **vector embedding**.
    - The embedding and metadata are stored in a **Vector Database**.

### B. Female User Flow (Discovery)

1.  **Registration**: User signs up.
2.  **Preference Input**:
    - User describes their ideal partner in natural language (text).
3.  **Search & Matching**:
    - The input text is chunked and converted into a distinct query vector.
    - The system performs a **Similarity Search** against the Male User Vector Database.
4.  **Results**:
    - The system returns the **Top 5** most similar profiles.
    - Profiles are anonymous (no names/photos initially).

## 3. Connection & Locking Mechanism

1.  **Selection**: The Female user selects one profile from the top 5 to connect with.
2.  **Connection Request**: A request is sent to the selected Male user.
3.  **Lock State**:
    - If the Male user **accepts** the request, the connection is established.
    - **Exclusivity Lock**: Once connected, the Female user is "locked" and cannot make requests to other users. This prevents parallel dating/spamming and ensures focus.

## 4. Anonymity & Reveal Phase

1.  **Anonymous Interaction**:
    - The connected couple interacts (chat) while remaining anonymous.
2.  **Reveal Mechanism**:
    - Either party can initiate a "Reveal Request".
    - **Mutual Consent**: The reveal only happens if **BOTH** parties agree (click the "Reveal" button).
3.  **Identity Exchange**:
    - Upon mutual agreement, the server exchanges their **Instagram IDs**.
    - Users can now connect off-platform.

## 5. Technical Stack (Suggested)

- **Frontend**: Next.js / React (for the web interface).
- **Backend**: Node.js / Python (FastAPI/Django).
- **AI/LLM**: OpenAI API / Anthropic Claude / Gemini (for interview and summarization).
- **Vector Database**: Pinecone / Weaviate / Milvus (for similarity search).
- **Database**: PostgreSQL / MongoDB (for user data and state management).
