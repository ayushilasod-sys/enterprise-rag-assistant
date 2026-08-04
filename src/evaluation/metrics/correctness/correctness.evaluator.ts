import { Inject, Injectable } from '@nestjs/common';

import type { LLM } from 'src/ai/interfaces/llm.interface';
import { LLM_TOKEN } from 'src/ai/constants/llm.constants';

import type { Evaluator } from '../../interfaces/evaluator.interface';
import { EvaluationMetric } from '../../interfaces/evaluation-metric.enum';
import type { EvaluationRequest } from '../../interfaces/evaluation-request.interface';
import type { EvaluationResult } from '../../interfaces/evaluation-result.interface';
import { CorrectnessPromptBuilder } from './correctness.prompt';
import { CorrectnessParser } from './correctness.parser';

@Injectable()
export class CorrectnessEvaluator implements Evaluator {
  private readonly promptBuilder = new CorrectnessPromptBuilder();
  private readonly parser = new CorrectnessParser();

  constructor(
    @Inject(LLM_TOKEN)
    private readonly llm: LLM,
  ) {}

  async evaluate(request: EvaluationRequest): Promise<EvaluationResult> {
    console.log('Evaluating correctness for request:', request);
    const prompt = this.promptBuilder.build(
      request.question,
      request.context,
      request.answer,
    );

    const response = await this.llm.generateText(prompt);

    const evaluation = this.parser.parse(response);

    return {
      metric: EvaluationMetric.CORRECTNESS,
      score: evaluation.score,
      reason: evaluation.reason,
      claims: evaluation.claims,
    };
  }
}
