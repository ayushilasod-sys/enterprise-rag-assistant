import { Inject, Injectable } from '@nestjs/common';

import { EVALUATORS } from '../constants/evaluators.constants';
import { Evaluator } from '../interfaces/evaluator.interface';
import { EvaluationRequest } from '../interfaces/evaluation-request.interface';
import { EvaluationResult } from '../interfaces/evaluation-result.interface';

@Injectable()
export class EvaluationEngine {
  constructor(
    @Inject(EVALUATORS)
    private readonly evaluators: Evaluator[],
  ) {}

  async evaluate(request: EvaluationRequest): Promise<EvaluationResult[]> {
    return Promise.all(
      this.evaluators.map((evaluator) => evaluator.evaluate(request)),
    );
  }
}
