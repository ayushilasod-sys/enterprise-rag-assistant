import { HallucinationEvaluation } from './hallucination.types';

export class HallucinationParser {
  parse(response: string): HallucinationEvaluation {
    const cleaned = response
      .replace(/^```json\s*/i, '')
      .replace(/^```\s*/i, '')
      .replace(/```$/i, '')
      .trim();

    return JSON.parse(cleaned);
  }
}
