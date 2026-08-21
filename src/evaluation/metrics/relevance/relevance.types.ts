export interface RelevantClaim {
  claim: string;
  relevant: boolean;
  explanation: string;
}

export interface RelevanceEvaluation {
  score: number;
  reason: string;
  claims: RelevantClaim[];
}
