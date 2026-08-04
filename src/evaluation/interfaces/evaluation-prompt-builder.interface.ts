export interface EvaluationPromptBuilder {
  build(question: string, context: string, answer: string): string;
}
