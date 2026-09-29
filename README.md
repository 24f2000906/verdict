# ⚖️ Verdict — Indian AI Lawyer

Verdict answers plain-language questions about Indian law and shows the exact provisions it relied on. Every answer is checked against the passages that were actually retrieved before it reaches the user.

> **Disclaimer:** Verdict is a legal *research* aid, not a lawyer. Its answers are not legal advice. Always confirm with the primary text or a qualified advocate.

---

## Table of contents

- [Features](#features)
- [How it works](#how-it-works)
- [Tech stack](#tech-stack)
- [Repository structure](#repository-structure)
- [Getting started](#getting-started)
- [Configuration](#configuration)
- [Building the knowledge base](#building-the-knowledge-base)
- [API reference](#api-reference)
- [Frontend](#frontend)
- [Current status and limitations](#current-status-and-limitations)
- [Roadmap](#roadmap)

---

## Features

- **Grounded answers.** The model is instructed to answer only from retrieved context and to cite the passage behind every sentence.
- **Citation verification.** A verifier step compares every citation in the draft against the retrieved passages and labels the result `verified`, `unverified` or `flagged`.
- **Automatic retry.** If a citation cannot be matched to a retrieved source, the answer is regenerated once with a correction note before being returned.
- **Fully local AI.** LLM and embeddings run on [Ollama](https://ollama.com); vectors live in [ChromaDB](https://www.trychroma.com). No third-party AI API is required.
- **Dark-only, animated frontend** built with Next.js App Router, with a landing page and a chat-style `/ask` page.

## How it works

```
                ┌──────────────────────────── LangGraph ────────────────────────────┐
 Question ───►  │  retrieve  ───►  synthesize  ───►  verify ──┬─► done (final answer)│ ───► Answer
 (POST /ask)    │  (top-4 via      (Ollama LLM,      (citation │                     │      + citations
                │   Chroma)         cited draft)      check)   └─► flagged? retry ───┘      + status
                └───────────────────────────────────────────────────────────────────┘
                                          ▲ (max 1 retry)
```

1. **Retrieve** – embeds the question and fetches the 4 most similar chunks from Chroma.
2. **Synthesize** – prompts the LLM to paraphrase the context and end every sentence with a tag such as `[Constitution | 21]`. If nothing in the context answers the question, it must say so and cite nothing.
3. **Verify** – extracts every `[source | section]` tag from the draft and checks it against the retrieved chunks.
   - all tags match → `verified`
   - no tags → `unverified`
   - any tag not in the retrieved set → `flagged` (a warning is prepended, and the graph loops back to *synthesize* once, telling the model which citations were invalid)

## Tech stack

| Layer | Technology |
| --- | --- |
| Frontend | Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, Motion, lucide-react |
| Backend | Python 3.13, FastAPI, Uvicorn, Pydantic |
| Orchestration | LangGraph, LangChain (`langchain-ollama`, `langchain-chroma`) |
| LLM + embeddings | Ollama (models set via env vars) |
| Vector store | ChromaDB |
| Ingestion | pypdf + regex-based article chunker |
| Infra | Docker Compose |

## Repository structure

```
verdict/
├── docker-compose.yml          # ollama + chroma + backend + frontend
├── .env                        # you create this (see Configuration)
├── backend/
│   ├── Dockerfile
│   ├── requirements.txt
│   └── app/
│       ├── main.py             # FastAPI app, CORS, router registration
│       ├── api/routes/
│       │   ├── ask.py          # POST /ask  — runs the LangGraph pipeline
│       │   └── test.py         # POST /test — smoke-test route
│       ├── core/
│       │   ├── config.py       # settings loaded from env
│       │   └── llm.py          # ChatOllama factory (temp 0.1, 8k ctx)
│       ├── db/vectorstore.py   # Chroma + Ollama embeddings client
│       ├── graph/
│       │   ├── graph.py        # StateGraph wiring + retry routing
│       │   ├── state.py        # GraphState definition
│       │   └── node/           # retriever.py, synthesizer.py, verifier.py
│       ├── ingestion/          # parser.py, chunker.py, indexer.py, build.py
│       └── models/schemas.py   # AskRequest / AskResponse / Citation
├── corpus/
│   ├── raw/constitution.pdf    # source document
│   └── processed/constitution_chunks.json   # 437 article-level chunks
└── frontend/
    ├── Dockerfile
    ├── package.json
    └── app/
        ├── layout.tsx          # fonts (Instrument Serif, Geist), dark theme
        ├── globals.css         # design tokens (ink, panel, ivory, brass, chakra)
        ├── page.tsx            # animated landing page
        └── ask/page.tsx        # chat UI with citations + verification badge
```

## Getting started

### Prerequisites

- Docker and Docker Compose
- An **NVIDIA GPU** with the NVIDIA Container Toolkit (the `ollama` service reserves one GPU in `docker-compose.yml`). On a machine without a GPU, remove the `deploy:` block from the `ollama` service; it will run on CPU, more slowly.

### 1. Create `.env` in the project root

```env
# Backend
OLLAMA_URL=http://ollama:11434
TEXT_MODEL=<an Ollama chat model, e.g. one you have pulled>
EMBEDDING_MODEL=<an Ollama embedding model>
FRONTEND_URL=http://localhost:3000

# Frontend (must be the full URL of the /ask endpoint, as seen from the browser)
NEXT_PUBLIC_BACKEND_URL=http://localhost:7000/ask
```

### 2. Start the stack

```bash
docker compose up --build
```

| Service | URL |
| --- | --- |
| Frontend | http://localhost:3000 |
| Backend (FastAPI) | http://localhost:7000 — interactive docs at `/docs` |
| Chroma | http://localhost:8000 |
| Ollama | http://localhost:11434 |

### 3. Pull the models into Ollama

```bash
docker compose exec ollama ollama pull <TEXT_MODEL>
docker compose exec ollama ollama pull <EMBEDDING_MODEL>
```

### 4. Build the knowledge base (first run only)

```bash
docker compose exec backend python -m app.ingestion.build --reset
```

Then open http://localhost:3000 and ask a question.

## Configuration

| Variable | Used by | Description |
| --- | --- | --- |
| `OLLAMA_URL` | backend | Base URL of the Ollama server |
| `TEXT_MODEL` | backend | Ollama model used to write answers |
| `EMBEDDING_MODEL` | backend | Ollama model used for embeddings (must be the same for indexing and querying) |
| `FRONTEND_URL` | backend | Allowed CORS origin |
| `NEXT_PUBLIC_BACKEND_URL` | frontend | Full URL of the `POST /ask` endpoint |

Fixed in code (`backend/app/core/config.py`): Chroma host `chroma`, port `8000`, collection `verdict_embeddings`.

## Building the knowledge base

The ingestion pipeline lives in `backend/app/ingestion/`:

1. **Parse** – `pypdf` extracts text from `corpus/raw/constitution.pdf`, then whitespace is normalised.
2. **Chunk** – a regex detects article headings (`21. Protection of life…—`), rejects false positives by requiring article numbers to increase monotonically, tags each chunk with its **Part**, and splits anything over 3,500 characters. Each chunk carries `source`, `article`, `title` and `part` metadata.
3. **Index** – chunks are embedded and written to Chroma in batches of 32.

```bash
# Full run: parse, save chunks JSON, embed and index (wipe the collection first)
docker compose exec backend python -m app.ingestion.build --reset

# Parse and inspect chunks only, skip indexing
docker compose exec backend python -m app.ingestion.build --dry-run

# Custom input/output
docker compose exec backend python -m app.ingestion.build --pdf /corpus/raw/constitution.pdf --out /corpus/processed/constitution_chunks.json
```

To add a new law, drop its PDF in `corpus/raw/`, write a chunker that emits the same `{id, content, metadata}` shape (with a distinct `source`), and index it. The synthesizer and verifier already key citations on `source` + `article`/`section` metadata.

## API reference

### `POST /ask`

**Request**

```json
{ "question": "Explain Article 21 of the Constitution" }
```

`session_id` is accepted but currently unused.

**Response**

```json
{
  "answer": "Article 21 protects life and personal liberty … [Constitution | 21]",
  "citations": [
    { "source": "Constitution", "section": "21", "excerpt": "Article 21. Protection of life and personal liberty …" }
  ],
  "verification_status": "verified"
}
```

| `verification_status` | Meaning |
| --- | --- |
| `verified` | Every citation matched a retrieved passage |
| `unverified` | The answer contained no citations |
| `flagged` | At least one citation was not in the retrieved set, even after one retry; the answer is prefixed with a warning |

### Other routes

- `GET /` – health check
- `POST /test` – smoke test

## Frontend

- **`/`** – animated landing page: parallax hero, scroll-reveal sections, sample Q&A, list of supported laws.
- **`/ask`** – chat interface with sample prompts, animated messages, a verification badge (green for verified, amber otherwise) and a citations panel.
- Dark theme only; palette tokens (`ink`, `panel`, `ivory`, `brass`, `chakra`) are defined in `app/globals.css`.

Run it outside Docker:

```bash
cd frontend
npm install
NEXT_PUBLIC_BACKEND_URL=http://localhost:7000/ask npm run dev
```

## Current status and limitations

- **Only the Constitution is indexed** (437 chunks). The landing page mentions BNS, BNSS, BSA and other Acts; their text has not been ingested yet, so questions about them will not be answered from source material.
- Retrieval is plain top-4 similarity search with no re-ranking or query classification (`query_type` exists in the graph state but is unused).
- The verifier checks that a citation *exists* in the retrieved set; it does not check that the sentence actually follows from the cited text.
- No conversation memory (`session_id` is not used) and no streaming; each question is answered independently.
- The Ollama service is configured for an NVIDIA GPU by default.
- The `/test` route is a leftover smoke test and can be removed before deployment.

## Roadmap

- Ingest BNS, BNSS, BSA and the remaining Acts listed on the landing page
- Add a query-classification step to route questions to the right corpus
- Stronger verification (claim-to-passage entailment check)
- Conversation history and streaming responses
- Automated tests and CI

## License

No license file is included yet. Add one before publishing.
