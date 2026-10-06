# ⚖️ Verdict - AI Lawyer

**Verdict** is a retrieval-augmented legal research assistant for Indian law. Ask a question in plain language and get a concise answer grounded in the actual text of statutes, with every claim tied to a specific Act and section.

Unlike a general-purpose chatbot, Verdict answers **only from the provisions it retrieves**, then runs a verification step that checks every citation and section reference in the answer against those sources. If something can't be verified, the answer is flagged. If the corpus has no answer, Verdict says so instead of guessing.

> ⚠️ **Disclaimer:** Verdict is a research aid, not legal advice. Always confirm against the official text of the law and consult a qualified advocate for legal matters.

---

## Features

- **Grounded answers**: the model is instructed to use only the retrieved sources and cite them inline.
- **Citation verification**: a dedicated node checks citation tags and any `section`/`article` mentioned in the answer against the retrieved provisions.
- **Self-correcting retry**: flagged or uncited answers are regenerated once, with feedback about what went wrong.
- **Honest "not found"**: if nothing relevant is retrieved (or the model can't answer from the sources), the user gets a clear message instead of a hallucination.
- **Structured responses**: the API returns the answer, a list of citations (act, section, excerpt) and a `verification_status`.
- **Response caching**: verified answers are cached in memory for repeat questions.
- **Fully containerised**: one `docker compose up` starts the vector DB, API and web app.

## Corpus

The index is built from 12 statutes:

| File | Act | Year |
| :--- | :--- | :--- |
| `bns.jsonl` | Bharatiya Nyaya Sanhita | 2023 |
| `bnss.jsonl` | Bharatiya Nagarik Suraksha Sanhita | 2023 |
| `bsa.jsonl` | Bharatiya Sakshya Adhiniyam | 2023 |
| `coi.jsonl` | Constitution of India | 1950 (as amended) |
| `cpc.jsonl` | Code of Civil Procedure | 1908 |
| `crpc.jsonl` | Code of Criminal Procedure | 1973 |
| `hma.jsonl` | Hindu Marriage Act | 1955 |
| `ida.jsonl` | Indian Divorce Act | 1869 |
| `iea.jsonl` | Indian Evidence Act | 1872 |
| `ipc.jsonl` | Indian Penal Code | 1860 |
| `mva.jsonl` | Motor Vehicles Act | 1988 |
| `nia.jsonl` | Negotiable Instruments Act | 1881 |

## Architecture

```
┌──────────────┐   POST /ask    ┌─────────────────────────────────────────┐
│  Next.js UI  │ ─────────────▶ │              FastAPI backend            │
│  (port 3000) │ ◀───────────── │               (port 7000)               │
└──────────────┘  answer +      │                                         │
                  citations     │   LangGraph pipeline                    │
                                │   ┌──────────┐  ┌────────────┐  ┌──────┐│
                                │   │ retrieve │─▶│ synthesize │─▶│verify││
                                │   └──────────┘  └─────▲──────┘  └──┬───┘│
                                │                       └── retry ◀──┘    │
                                └───────────┬─────────────────────────────┘
                                            │ similarity search
                                     ┌──────▼──────┐
                                     │  ChromaDB   │
                                     │ (port 8000) │
                                     └─────────────┘
```

### The pipeline (LangGraph)

1. **Retrieve**: fetches the top candidates from ChromaDB, discards anything beyond a distance threshold, and keeps the best matches (deterministically ordered).
2. **Synthesize**: prompts the LLM to answer using *only* the numbered sources, tag each statement (`[D1]`, `[D2]`, …), and reply `NOT_FOUND` if the sources don't cover the question.
3. **Verify**: confirms every tag maps to a real retrieved source and every mentioned section/article exists in those sources. Tags are rewritten into readable references such as `[IPC 302]`, and a citation list is built. The result is one of:
   - `verified`: all references check out
   - `flagged`: unsupported references found (the answer is shown with a warning)
   - `unverified`: no citations were produced
   - `not_found`: nothing relevant in the corpus

   `flagged` and `unverified` answers are sent back to **Synthesize** for one retry before the response is returned.

## Tech stack

| Layer | Technology |
| :--- | :--- |
| Frontend | Next.js 16, React 19, TypeScript, Tailwind CSS 4, Motion, Lucide |
| Backend | Python 3.13, FastAPI, Uvicorn, Pydantic |
| Orchestration | LangChain, LangGraph, LangSmith |
| Models | NVIDIA AI Endpoints (chat + embeddings) via `langchain-nvidia-ai-endpoints` |
| Vector store | ChromaDB |
| Infrastructure | Docker, Docker Compose |

## Project structure

```
verdict/
├── docker-compose.yml
├── thought.md                     # dataset notes & roadmap
├── backend/
│   ├── Dockerfile
│   ├── requirements.txt
│   └── app/
│       ├── main.py                # FastAPI app, CORS, routers
│       ├── ingestion.py           # Index prepared chunks into ChromaDB
│       ├── api/routes/
│       │   ├── ask.py             # POST /ask: runs the graph, caches results
│       │   └── test.py            # POST /test: raw LLM sanity check
│       ├── core/
│       │   ├── config.py          # Settings loaded from environment
│       │   └── llm.py             # Chat model factory
│       ├── db/vectorstore.py      # Chroma + embeddings client
│       ├── graph/
│       │   ├── graph.py           # Graph wiring and retry routing
│       │   ├── state.py           # Shared graph state
│       │   └── node/              # retriever / synthesizer / verifier
│       └── models/
│           ├── schemas.py         # Request/response models
│           └── prepare_corpus.py  # Convert raw legal files → chunks
|
├── corpus/
|   └──chunks/
|      ├── bns.jsonl
|      ├── coi.jsonl
|      └── other jsonl files (core data)
|
└── frontend/
    ├── Dockerfile
    └── app/
        ├── page.tsx               # Landing page
        ├── ask/page.tsx           # Question & answer interface
        ├── layout.tsx
        └── globals.css
```

## Getting started

### Prerequisites

- [Docker](https://docs.docker.com/get-docker/) and Docker Compose
- An NVIDIA API key with access to a chat model and an embedding model ([build.nvidia.com](https://build.nvidia.com))
- The raw legal dataset files (see [Corpus](#corpus))

### 1. Configure environment variables

Create a `.env` file in the project root:

```env
# Backend
FRONTEND_URL=http://localhost:3000
TEXT_MODEL=<nvidia-chat-model-name>
TEXT_MODEL_API_KEY=<your-nvidia-api-key>
EMBEDDING_MODEL=<nvidia-embedding-model-name>
EMBEDDING_MODEL_API_KEY=<your-nvidia-api-key>

# Frontend
NEXT_PUBLIC_BACKEND_URL=http://localhost:7000
```

### 2. Add the corpus

Place the raw statute files in `./corpus/raw/`. The compose file mounts `./corpus` into the backend container at `/corpus`.

### 3. Start the stack

```bash
docker compose up --build
```

| Service | URL |
| :--- | :--- |
| Web app | http://localhost:3000 |
| API | http://localhost:7000 |
| API docs (Swagger) | http://localhost:7000/docs |
| ChromaDB | http://localhost:8000 |

### 4. Build and load the index

With the stack running, convert the raw files into chunks and index them:

```bash
# Normalise raw files into the chunk schema
docker compose exec backend python -m app.models.prepare_corpus \
  --raw /corpus/raw --out /corpus/chunks

# (Optional) dry run: count chunks without indexing
docker compose exec backend python -m app.ingestion --dir /corpus/chunks --dry-run

# Embed and index (use --reset to wipe the existing collection first)
docker compose exec backend python -m app.ingestion --dir /corpus/chunks --reset
```

Open http://localhost:3000 and start asking questions.

## API reference

### `POST /ask`

**Request**

```json
{
  "question": "What is the punishment for cheating under the BNS?",
  "session_id": null
}
```

**Response**

```json
{
  "answer": "Cheating is punishable with ... [BNS 318]",
  "citations": [
    {
      "source": "Bharatiya Nyaya Sanhita, 2023",
      "section": "318",
      "excerpt": "Bharatiya Nyaya Sanhita, 2023 (BNS) - Section 318: ..."
    }
  ],
  "verification_status": "verified"
}
```

`verification_status` is one of `verified`, `flagged`, `unverified` or `not_found`. The API returns `503` if the model backend fails or is overloaded.

> `session_id` is accepted but not used yet. See the roadmap.

### `POST /test`

Sends `question` straight to the LLM (no retrieval) and returns `{"Answer": "..."}`. Useful for checking that your model credentials work.

## Local development

Both services run with hot reload in Docker (the source directories are mounted as volumes). To run outside Docker:

```bash
# Backend
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload --port 7000

# Frontend
cd frontend
npm install
npm run dev
```

When running the backend outside Docker, set `chroma_host` in `app/core/config.py` to `localhost` (it defaults to the Docker service name `chroma`).

## Tuning

Retrieval and verification behaviour is controlled by a few constants:

| Constant | File | Meaning |
| :--- | :--- | :--- |
| `FETCH_K` / `KEEP_K` | `graph/node/retriever.py` | Candidates fetched vs. passages passed to the LLM |
| `MAX_DIST` | `graph/node/retriever.py` | Maximum vector distance for a passage to count as relevant |
| `MAX_RETRIES` | `graph/graph.py` | Regeneration attempts after a failed verification |
| `MAX_CHARS` | `models/prepare_corpus.py` | Maximum chunk size before a section is split |

## Roadmap

- [ ] **Conversation memory**: session management and multi-turn context (summary / windowed memory)
- [ ] **Redis caching**: cache embeddings, retrieval results and session history
- [ ] **Reasoning mode**: enable model thinking for complex, multi-step statutory cross-referencing
- [ ] **Document upload**: parse PDF/DOCX/TXT briefs and filings for analysis

## Contributing

Issues and pull requests are welcome. For larger changes, please open an issue first to discuss what you'd like to change.