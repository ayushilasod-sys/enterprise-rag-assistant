import { EvaluationPromptBuilder } from '../../interfaces/evaluation-prompt-builder.interface';

export class RelevancePromptBuilder implements EvaluationPromptBuilder {
  build(question: string, context: string, answer: string): string {
    return `
You are an expert AI evaluator.

Determine whether the answer is relevant to the user's question.

Question:
${question}

Context:
${context}

Answer:
${answer}

Evaluate each important claim in the answer.

Return ONLY valid JSON.

{
  "score": 0-100,
  "reason": "...",
  "claims": [
    {
      "claim": "...",
      "relevant": true,
      "explanation": "..."
    }
  ]
}

Do not return markdown.
Do not wrap the JSON with \`\`\`.
`;
  }
}
