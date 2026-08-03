import { EvaluationRequest } from "./evaluation-request.interface";
import { EvaluationResult } from "./evaluation-result.interface";

export interface Evaluator {
  evaluate(request: EvaluationRequest): Promise<EvaluationResult>;
}

