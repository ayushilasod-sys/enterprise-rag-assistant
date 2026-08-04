import { EvaluationMetric } from './evaluation-metric.enum';
export interface EvaluationResult<T = unknown> {
  metric: EvaluationMetric;
  score: number;
  reason: string;
  claims?: T[];
}
