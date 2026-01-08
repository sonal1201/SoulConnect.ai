# SoulConnect.ai - AI Partner Matching Application

This document outlines the user flow and architecture for an anonymous, AI-driven partner matching platform.

## 1. System Overview

The platform connects users based on personality compatibility and preferences using Large Language Models (LLM) and Vector Search. Users remain anonymous until a mutual agreement reveals their identities.

## 2. User Flows

### A. Authentication & Onboarding

This flow handles the split between New Users, Existing Males, and Existing Females.

1.  **Google Sign-In**:
    - User clicks "Login with Google".
    - **Check DB**: Backend checks if `email` exists in Postgres.
    - **Scenario A: New User**
      - Redirect to `/onboarding`.
      - **Step 1**: Ask "Are you a Boy or a Girl?"
      - **Step 2 (Boy)**: Redirect to `/interview` (The 10 Question Chat).
      - **Step 2 (Girl)**: Redirect to `/search` (The Partner Search).
    - **Scenario B: Existing User**
      - **Check Profile Status**:
        - Is `gender == MALE`? -> Go to `/dashboard` (Show incoming requests or Chat).
        - Is `gender == FEMALE`? -> Go to `/search` or `/dashboard` (If matched).

### B. Male User Flow (The Interview)

1.  **Start Interview**: System initiates the 10-question personality test.
2.  **Profile Generation**:
    - LLM synthesizes responses.
    - Profile is converted to a **Vector Embedding**.
    - Stored in **Qdrant**.

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

## 5. Technical Stack

- **Frontend**: Next.js / React (for the web interface).
- **Backend**: Node.js / Python (FastAPI/Django).
- **AI/LLM**: OpenAI API / Anthropic Claude / Gemini (for interview and summarization).
- **Vector Database**: Pinecone / Weaviate / Milvus (for similarity search).
- **Database**: PostgreSQL / MongoDB (for user data and state management).

