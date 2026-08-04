import { EvaluationPromptBuilder } from 'src/evaluation/interfaces/evaluation-prompt-builder.interface';

export class CorrectnessPromptBuilder implements EvaluationPromptBuilder {
  build(question: string, context: string, answer: string): string {
    return `
You are an expert AI evaluator.

Your task is to determine whether the answer correctly answers the user's question using the provided context.

Question:
${question}

Context:
${context}

Answer:
${answer}

Evaluate the answer for correctness.

Return ONLY valid JSON.

{
  "score": 0-100,
  "reason": "Short explanation",
  "claims": [
    {
      "claim": "...",
      "correct": true,
      "explanation": "Why"
    }
  ]
}

Do not include markdown.
Do not wrap with \`\`\`json.
`;
  }
}
