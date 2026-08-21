import { RelevanceEvaluation } from './relevance.types';

export class RelevanceParser {
  parse(response: string): RelevanceEvaluation {
    const cleaned = response
      .replace(/^```json\s*/i, '')
      .replace(/^```\s*/i, '')
      .replace(/```$/i, '')
      .trim();

    return JSON.parse(cleaned);
  }
}
