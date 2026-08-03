import { GroundednessEvaluation } from './groundedness.types';

export class GroundednessParser {
  parse(response: string): GroundednessEvaluation {
    return JSON.parse(response);
  }
}
