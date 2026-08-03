export class EvaluationRequestDto {
  question: string;
  context: string;
  answer: string;
  expectedAnswer?: string;
}
