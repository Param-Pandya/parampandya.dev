---
title: "Understanding Large Language Models"
description: "A complete introduction to transformers, tokens, embeddings, attention, pretraining, fine-tuning, inference, and modern LLM architectures."
category: "LLMs"
tags: ["LLMs", "Transformers", "Attention Mechanism", "Deep Learning"]
author: "Param Pandya"
published: "August 5, 2024"
readingTime: "9 min read"
featured: true
coverImage: "/projects/deepfake.png"
slug: "understanding-large-language-models"
---

# Understanding Large Language Models: From Tokens to ChatGPT

Watching a system like ChatGPT write code, compose a poem, or work through a research question can feel like there's a small mind behind the screen reasoning through each word. What's actually happening is narrower than that: a large language model (LLM) doesn't think in the way a person does. At its core, it's a pattern-prediction engine whose one job is to look at a sequence of words and predict what comes next.

Here's how that mechanism scales up into something that holds a conversation.

## 1. Tokens: the building blocks of language

A computer doesn't read words; it reads numbers. Before an LLM processes any text, it first breaks the passage into smaller units called tokens — a short word like "cat" might be a single token, while a longer or less common word like "unpredictable" gets split into pieces such as "un," "predict," and "able." Punctuation and spaces are typically tokens in their own right too. As a rough rule, one token in English corresponds to about four characters, or three-quarters of a word. Once the text is tokenized, each token is mapped to a numerical ID that the model can actually operate on.

## 2. Vectors and embeddings: mapping meaning

Nothing about the raw token IDs tells a model that "king" and "queen" are related, or that "apple" can refer to either a fruit or a company. That relationship comes from placing every token in a high-dimensional space called an embedding space, where words with similar meanings end up positioned near each other — "happy" and "joyful" close together, "hot" and "cold" far apart. Each token becomes a vector, a list of numbers marking its coordinates in that space, and the distances between vectors are what let the model treat word relationships as something it can compute over.

## 3. The transformer: context and attention

Before 2017, models generally read text strictly left to right, one word at a time, which meant that by the end of a long sentence, information from the beginning had often been lost. The transformer architecture changed this, largely through a mechanism called self-attention.

Self-attention works something like a highlighter running across the whole sentence at once rather than word by word. In the sentence "The bank approved the loan because it had good financial records," the model uses self-attention to work out that "it" refers back to "the bank" rather than "the loan," by weighing every word against every other word simultaneously and tracking which ones actually depend on each other for meaning.

## 4. Building a model like ChatGPT

Getting from a raw statistical algorithm to something that behaves like a helpful assistant takes three stages.

| Stage | Rough Equivalent | What Happens |
| --- | --- | --- |
| Pre-training | Reading through an entire library | The model reads a huge volume of text to pick up grammar, facts, and patterns of reasoning, becoming very good at predicting what comes next. |
| Fine-tuning (SFT) | Going through job training | Humans provide examples of good instruction-following, like turning "summarize this email" into an actual summary, and the model learns from those examples directly. |
| Alignment (RLHF) | Getting feedback from a supervisor | Reinforcement learning from human feedback rewards helpful, well-formed answers and penalizes ones that are harmful or wrong. |

## 5. Tokenization in Python

Open-source tools like `tiktoken`, used by OpenAI's models, make it possible to see this token-splitting step directly:

```python
import tiktoken

# 1. Load the tokenizer for a standard LLM
encoder = tiktoken.get_encoding("cl100k_base")

text = "Large Language Models are fascinating!"

# 2. Convert text into numerical token IDs
tokens = encoder.encode(text)
print("Token IDs:", tokens)

# 3. See how the text was split
for token_id in tokens:
    word_piece = encoder.decode([token_id])
    print(f"ID: {token_id} -> '{word_piece}'")
```

This is what the model actually sees:

```
Token IDs: [29221, 10175, 23719, 527, 43900, 0]
ID: 29221 -> 'Large'
ID: 10175 -> ' Language'
ID: 23719 -> ' Models'
ID: 527   -> ' are'
ID: 43900 -> ' fascinating'
ID: 0     -> '!'
```

## The core idea

None of this involves the model searching a database for a stored answer. It's a statistical process: text gets split into tokens, those tokens get mapped as vectors carrying meaning, attention tracks how words in a sentence depend on each other, and the model predicts the next token over and over, one step at a time, until what comes out reads as fluent conversation.
