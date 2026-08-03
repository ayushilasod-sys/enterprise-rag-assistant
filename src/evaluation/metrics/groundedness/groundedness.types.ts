export interface GroundednessClaim {
  claim: string;
  supported: boolean;
  evidence: string;
}

export interface GroundednessEvaluation {
  score: number;
  reason: string;
  claims: GroundednessClaim[];
}
