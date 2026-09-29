import re
from app.graph.state import GraphState

CITATION_PATTERN = re.compile(r"\[([^\[\]|]+?)\s*\|\s*([^\[\]|]+?)\]")

def _norm(s: str) -> str:
    return s.strip().lower()

def verifier_node(state: GraphState) -> dict:
    answer = state["draft_answer"] or ""

    supported = {}
    for d in state["retrieved_docs"]:
        meta = d["metadata"]
        source = meta.get("source", "unknown")
        section = str(meta.get("article", meta.get("section", "n/a")))
        supported[(_norm(source), _norm(section))] = d

    claimed = CITATION_PATTERN.findall(answer)
    claimed = list(dict.fromkeys((_norm(s), _norm(sec)) for s, sec in claimed))  # dedupe, keep order

    verified, unsupported = [], []
    for key in claimed:
        if key in supported:
            d = supported[key]
            verified.append({
                "source": d["metadata"].get("source", "unknown"),
                "section": str(d["metadata"].get("article", d["metadata"].get("section", ""))),
                "excerpt": d["content"][:200],
            })
        else:
            unsupported.append(f"{key[0]} | {key[1]}")

    if unsupported:
        status = "flagged"
    elif verified:
        status = "verified"
    else:
        status = "unverified"

    final = answer
    if status == "flagged":
        final = (
            "⚠️ Some citations could not be verified against the retrieved sources: "
            + ", ".join(unsupported) + "\n\n" + answer
        )

    return {
        "citations": verified,
        "unsupported_citations": unsupported,
        "verification_status": status,
        "final_answer": final,
        "retry_count": state.get("retry_count", 0) + (1 if status == "flagged" else 0),
    }