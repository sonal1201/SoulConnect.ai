# Project Structure & Requirements

## 1. Top-Level Directory

Recommended approach: A mono-repo style with two main folders `client` and `server`.

```text
Ai-Match/
├── client/                 # Next.js Frontend
├── server/                 # Express + TypeScript Backend
├── README.md               # Documentation
└── .env                    # Environment variables (or one .env per folder)
```

## 2. Backend (Express + TypeScript + Prisma + LangGraph.js)

Since you chose Express/TS, you should use **LangGraph.js** (the JavaScript version of LangGraph) so you don't need a separate Python server.

```text
server/
├── prisma/
│   ├── schema.prisma       # Database Schema (Users, Matches, Vectors)
│   └── migrations/         # DB Migrations
├── src/
│   ├── config/             # Env vars, DB connection
│   ├── controllers/        # Request handlers (Auth, Chat, Matches)
│   ├── routes/             # API Routes definitions
│   ├── middlewares/        # Auth checks, error handling
│   ├── services/
│   │   ├── ai/             # AI Logic
│   │   │   ├── graph.ts    # LangGraph State Machine (Interview Flow)
│   │   │   ├── memory.ts   # Checkpointer
│   │   │   └── prompts.ts  # System prompts
│   │   ├── vector/         # NEW: Vector DB Logic
│   │   │   └── qdrant.ts   # Qdrant Client & Collections Manager
│   │   └── matching.ts     # Business logic (Combines Postgres + Qdrant results)
│   ├── utils/              # Helpers (e.g., embedding generator)
│   ├── types/              # TypeScript definitions
│   └── app.ts              # Express App setup
├── package.json
└── tsconfig.json
```

## 3. Frontend (Next.js 14+ App Router)

```text
client/
├── src/
│   ├── app/                # App Router
│   │   ├── (auth)/         # Login/Register pages
│   │   ├── dashboard/      # Main User Dashboard
│   │   ├── interview/      # Chat Interface for 10 Qs (Male)
│   │   └── search/         # Partner Search Interface (Female)
│   ├── components/
│   │   ├── ui/             # Reusable UI (Buttons, Inputs)
│   │   └── chat/           # Chat Bubble, Input Area components
│   ├── lib/
│   │   ├── api.ts          # Axios/Fetch instances to call Backend
│   │   └── utils.ts
│   ├── hooks/              # Custom React Hooks
│   └── types/              # Frontend types
├── public/                 # Static assets
├── package.json
└── next.config.js
```

## 4. What Else You Need (The "Hidden" Requirements)

To make this work, you need a few critical pieces beyond just the code structure:

### A. Vector Support (Qdrant)

You have chosen **Qdrant** for your vector store.

- **Architecture**:
  - **Postgres**: Stores User Profile (Name, Age, Instagram ID, Gender) - The "Source of Truth".
  - **Qdrant**: Stores the _Embeddings_ (Vectors) + Search Metadata.
  - **Linking**: You must use the `UserId` (UUID) from Postgres as the `id` (or payload field) in Qdrant to link them together.
- **Library**: Install `@qdrant/js-client-rest` in your backend.

### B. AI & embeddings

- **LLM Provider**: OpenAI (GPT-4o/mini) or Anthropic (Claude 3.5 Sonnet).
- **Embedding Model**: `text-embedding-3-small` (OpenAI) is cheap and good for matching text.

### C. Libraries to Install

- **Backend**:
  - `@langchain/langgraph`: For the conversation loop.
  - `@langchain/openai`: To connect to GPT.
  - `pgvector`: For vector operations in Prisma.
  - `zod`: For validating user input/JSON extraction.
- **Frontend**:
  - `framer-motion`: For those "smooth animations" you want.
  - `lucide-react`: For nice icons.
  - `shadcn/ui` (Recommended): For pre-built beautiful components.

### D. Authentication

- How do users login?
- **Recommendation**: **Clerk** (Easiest) or **NextAuth.js** (Free, self-hosted).
- You need to pass the `UserId` to the backend so the AI knows who it is talking to.
