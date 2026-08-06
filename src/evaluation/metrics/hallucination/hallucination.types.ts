export interface HallucinatedClaim {
  claim: string;

  hallucinated: boolean;

  explanation: string;
}

export interface HallucinationEvaluation {
  score: number;

  reason: string;

  claims: HallucinatedClaim[];
}
