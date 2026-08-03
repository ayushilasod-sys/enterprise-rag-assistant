export class GroundednessPromptBuilder {
  build(question: string, context: string, answer: string): string {
    return `
You are an expert evaluator for Retrieval-Augmented Generation (RAG) systems.

Your task is to determine whether every factual claim in the answer is supported by the provided context.

Rules:

- Use ONLY the provided context.
- Never use outside knowledge.
- Do not infer missing facts.
- Ignore writing quality.
- Evaluate factual support only.

Scoring:

100 = Fully grounded

75 = Mostly grounded

50 = Some unsupported claims

25 = Mostly unsupported

0 = Completely unsupported

Return ONLY valid JSON.

{
  "score": number,
  "reason": string,
  "claims": [
    {
      "claim": string,
      "supported": boolean,
      "evidence": string
    }
  ]
}

Question:
${question}

Context:
${context}

Answer:
${answer}
`;
  }
}
