export interface CorrectnessClaim {
  claim: string;
  correct: boolean;
  explanation: string;
}

export interface CorrectnessEvaluation {
  score: number;
  reason: string;
  claims: CorrectnessClaim[];
}
