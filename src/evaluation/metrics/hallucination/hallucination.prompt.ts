import { EvaluationPromptBuilder } from '../../interfaces/evaluation-prompt-builder.interface';

export class HallucinationPromptBuilder implements EvaluationPromptBuilder {
  build(question: string, context: string, answer: string): string {
    return `
You are an expert AI evaluator.

Determine whether the answer contains hallucinated information.

Hallucinated information is any factual claim that cannot be supported by the provided context.

Question:
${question}

Context:
${context}

Answer:
${answer}

Return ONLY valid JSON.

{
  "score": 0-100,
  "reason": "...",
  "claims": [
    {
      "claim": "...",
      "hallucinated": true,
      "explanation": "..."
    }
  ]
}
  
score =
Math.round(
    nonHallucinatedClaims /
    totalClaims * 100
);

Do not use markdown.
Do not wrap with \`\`\`json.
`;
  }
}
