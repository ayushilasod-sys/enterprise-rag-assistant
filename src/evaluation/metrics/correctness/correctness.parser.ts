import { CorrectnessEvaluation } from './correctness.types';

export class CorrectnessParser {
  parse(response: string): CorrectnessEvaluation {
    const cleaned = response
      .replace(/^```json\s*/i, '')
      .replace(/^```\s*/i, '')
      .replace(/```$/i, '')
      .trim();

    return JSON.parse(cleaned);
  }
}
