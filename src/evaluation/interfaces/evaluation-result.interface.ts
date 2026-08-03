import { EvaluationMetric } from "./evaluation-metric.enum";

export interface EvaluationResult {
  metric: EvaluationMetric;
  score?: number;
  value?: unknown;
  reason?: string;
}
