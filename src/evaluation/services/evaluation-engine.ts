import { Inject, Injectable, Logger } from '@nestjs/common';

import { EVALUATORS } from '../constants/evaluators.constants';
import type { Evaluator } from '../interfaces/evaluator.interface';
import type { EvaluationRequest } from '../interfaces/evaluation-request.interface';
import type { EvaluationResult } from '../interfaces/evaluation-result.interface';
import { EvaluationReport } from '../interfaces/evaluation-report';

@Injectable()
export class EvaluationEngine {
  private readonly logger = new Logger(EvaluationEngine.name);
  constructor(
    @Inject(EVALUATORS)
    private readonly evaluators: Evaluator[],
  ) {}

  async evaluate(request: EvaluationRequest): Promise<EvaluationReport> {
    const start = Date.now();
    const results = await Promise.allSettled(
      this.evaluators.map((evaluator) => evaluator.evaluate(request)),
    );
    this.logger.log(`Running ${this.evaluators.length} evaluation metrics...`);
    const metrics = results
      .filter(
        (result): result is PromiseFulfilledResult<EvaluationResult> =>
          result.status === 'fulfilled',
      )
      .map((result) => result.value);
    const overallScore =
      metrics.length === 0
        ? 0
        : Math.round(
            metrics.reduce((sum, metric) => sum + metric.score, 0) /
              metrics.length,
          );

    this.logger.log(`Evaluation completed successfully.`);
    const duration = Date.now() - start;

    this.logger.log(`Evaluation finished in ${duration} ms`);
    return {
      overallScore,
      metrics,
      generatedAt: new Date().toISOString(),
      durationMs: duration, // Placeholder for duration, can be calculated if needed
    };
  }
}
