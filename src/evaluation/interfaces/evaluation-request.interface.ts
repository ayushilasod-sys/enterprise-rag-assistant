export interface EvaluationRequest {
  question: string;
  context: string;
  answer: string;
  expectedAnswer?: string;
}
