---
title: "Retrieval-Augmented Generation (RAG)"
description: "A complete beginner-to-production guide covering embeddings, chunking, retrieval, reranking, vector databases, and evaluation."
category: "RAG"
tags: ["RAG", "Vector Databases", "Embeddings", "Information Retrieval"]
author: "Param Pandya"
published: "September 2, 2024"
readingTime: "10 min read"
featured: false
coverImage: "/projects/deepfake.png"
slug: "complete-rag-guide"
---

# Retrieval-Augmented Generation (RAG): A Complete Guide from Basics to Production

Large language models run into two recurring problems. They hallucinate — when they don't actually know an answer, they'll often produce something plausible-sounding rather than correct. And their knowledge is frozen at whatever point their training data ended, so they have no way of knowing what's sitting in a private company database.

Retrieval-Augmented Generation (RAG) addresses both issues at once, essentially by turning a closed-book exam into an open-book one. Rather than asking the model to answer purely from what it learned during training, RAG searches a set of private documents first, pulls out the relevant facts, and hands those to the model to write the actual answer.

## 1. A working analogy: closed-book versus open-book

Picture a skilled lawyer answering questions about a company's internal policy. Without RAG, that lawyer is working from what they memorized in law school five years ago — if the policy changed yesterday, they either guess or get it wrong. With RAG, an assistant searches the company handbook the moment a question comes in, pulls the exact paragraph that answers it, and hands it to the lawyer with instructions to answer using only that text. The response ends up grounded in something real rather than recalled from memory.

## 2. How basic RAG works

A standard RAG system runs in three stages.

**Ingestion and storage.** Before the system can answer anything, the underlying knowledge base — PDFs, Notion pages, SQL tables, whatever it might be — has to be indexed. Long documents get split into smaller chunks, each chunk is run through an embedding model that converts it into a numerical vector representing its meaning, and those vectors are stored in a vector database such as Pinecone, Chroma, or Qdrant.

**Retrieval.** When a user asks something like "What is our remote work policy?", that question gets converted into the same kind of vector, and the database calculates similarity — cosine similarity is a common choice — to find the chunks whose meaning is closest to the question.

**Generation.** The retrieved chunks are combined with the original question into a single augmented prompt, which the model reads and uses to write a response grounded directly in the source material rather than in its training data.

## 3. Basic RAG versus production RAG

A basic RAG setup can be built in a handful of lines of code, but getting it to hold up in production means addressing several edge cases that a simple prototype glosses over.

| Feature | Basic RAG | Production RAG |
| --- | --- | --- |
| Search method | Vector similarity only | Hybrid search combining vector search with keyword search (BM25) |
| Retrieval accuracy | Takes the top 3–5 raw results | Reranking with a cross-encoder to reorder chunks by actual relevance |
| Data quality | Raw text splitting | Parent-document retrieval — searches small chunks but passes fuller context to the model |
| Guardrails | Answers regardless of retrieval quality | Checks whether the retrieved documents actually contain an answer before generating one |

## 4. A simple Python prototype

`sentence-transformers` makes it possible to see the core retrieval math directly, without a full RAG framework wrapped around it:

```python
from sentence_transformers import SentenceTransformer, util

# 1. Load a lightweight embedding model
model = SentenceTransformer('all-MiniLM-L6-v2')

# 2. Mock knowledge base (private company docs)
documents = [
    "Employees receive 20 days of paid time off (PTO) annually.",
    "Health insurance benefits kick in on the first day of employment.",
    "Engineers can expense up to $500 per year for home office equipment."
]

# 3. Embed the documents into vectors
doc_embeddings = model.encode(documents, convert_to_tensor=True)

# 4. User question
query = "How much money can I spend on a home desk setup?"
query_embedding = model.encode(query, convert_to_tensor=True)

# 5. Compute similarity scores (retrieval)
scores = util.cos_sim(query_embedding, doc_embeddings)[0]
best_match_idx = scores.argmax().item()

# 6. Output retrieved context for the LLM
retrieved_fact = documents[best_match_idx]
print(f"User Query: {query}")
print(f"Retrieved Fact: '{retrieved_fact}'")
print(f"Similarity Score: {scores[best_match_idx]:.4f}")

# --- Final step (passed to LLM) ---
# Prompt = f"Context: {retrieved_fact}\nQuestion: {query}\nAnswer:"
```

```
User Query: How much money can I spend on a home desk setup?
Retrieved Fact: 'Engineers can expense up to $500 per year for home office equipment.'
Similarity Score: 0.6841
```

## The core idea

RAG closes the gap between a model's static training-time knowledge and whatever data actually needs to be current. Pairing fast search over a document set with the model's ability to write natural language means the resulting assistant can cite where an answer came from, reflect information that changed after training ended, and stay closer to what its source documents actually say.
