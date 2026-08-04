import { EvaluationResult } from './evaluation-result.interface';

export interface EvaluationReport {
  overallScore: number;
  metrics: EvaluationResult[];
  generatedAt: string;
  durationMs: number;
}
