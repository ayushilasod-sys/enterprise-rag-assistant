import { GroundednessEvaluation } from './groundedness.types';

export class GroundednessParser {
  parse(response: string): GroundednessEvaluation {
    try {
      const cleaned = response
        .replace(/^```json\s*/i, '')
        .replace(/^```\s*/i, '')
        .replace(/```$/i, '')
        .trim();

      return JSON.parse(cleaned);
    } catch (error) {
      throw new Error(
        `Failed to parse Groundedness evaluation.\n\nRaw Response:\n${response}`,
      );
    }
  }
}
