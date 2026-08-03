import { Inject, Injectable } from '@nestjs/common';

import type { LLM } from 'src/ai/interfaces/llm.interface';
import { LLM_TOKEN } from 'src/ai/constants/llm.constants';

import { Evaluator } from '../../interfaces/evaluator.interface';
import { EvaluationMetric } from '../../interfaces/evaluation-metric.enum';
import { EvaluationRequest } from '../../interfaces/evaluation-request.interface';
import { EvaluationResult } from '../../interfaces/evaluation-result.interface';

import { GroundednessPromptBuilder } from './groundedness.prompt';
import { GroundednessParser } from './groundedness.parser';

@Injectable()
export class GroundednessEvaluator implements Evaluator {
  private readonly promptBuilder = new GroundednessPromptBuilder();
  private readonly parser = new GroundednessParser();

  constructor(
    @Inject(LLM_TOKEN)
    private readonly llm: LLM,
  ) {}

  async evaluate(request: EvaluationRequest): Promise<EvaluationResult> {
    const prompt = this.promptBuilder.build(
      request.question,
      request.context,
      request.answer,
    );

    const response = await this.llm.generateText(prompt);

    const evaluation = this.parser.parse(response);

    return {
      metric: EvaluationMetric.GROUNDEDNESS,
      score: evaluation.score,
      reason: evaluation.reason,
      value: evaluation.claims,
    };
  }
}
