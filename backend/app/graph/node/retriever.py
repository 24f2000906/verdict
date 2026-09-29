from app.graph.state import GraphState
from app.db.vectorstore import get_vectorstore

def retriever_node(state: GraphState) -> dict:
    vs = get_vectorstore()
    docs = vs.similarity_search(state['question'], k=4)
    retrieved = [{"content": d.page_content, "metadata": d.metadata} for d in docs]
    return {"retrieved_docs": retrieved}