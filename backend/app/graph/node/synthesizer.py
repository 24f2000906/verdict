from app.graph.state import GraphState
from app.core.llm import get_llm

def synthesizer_node(state: GraphState) -> dict:
    context_blocks = []
    for d in state["retrieved_docs"]:
        meta = d["metadata"]
        section = meta.get("article", meta.get("section", "n/a"))
        source = meta.get("source", "unknown")
        context_blocks.append(f"[{source} | {section}]\n{d['content']}")
    context = "\n\n".join(context_blocks)
    retry_note = ""

    if state.get("unsupported_citations"):
        bad = ", ".join(state["unsupported_citations"])
        retry_note = (
            f"\nYour previous answer cited sources that are NOT in the context: {bad}. "
            "Do not cite these. Cite only the bracketed tags shown in the context.\n"
        )

    prompt = f"""You are a legal research assistant. Answer ONLY using the context below.

Rules:
1. Write the answer in your own words. Do NOT copy the passage word for word.
2. End EVERY sentence with the tag of the passage it came from, copied exactly [Constitution | article_number].
3. Never use a tag that is not shown in the context.
4. If the context does not answer the question, reply exactly: "The provided sources do not contain a direct answer." and cite nothing.
{retry_note}

Context:
{context}

Question: {state["question"]}
Answer:"""

    llm = get_llm()
    response = llm.invoke(prompt)
    return {"draft_answer": response.content}
