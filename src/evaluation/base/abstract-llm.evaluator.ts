import { Inject } from '@nestjs/common';

import { LLM_TOKEN } from 'src/ai/constants/llm.constants';
import type { LLM } from 'src/ai/interfaces/llm.interface';

import type { EvaluationMetric } from '../interfaces/evaluation-metric.enum';
import type { EvaluationRequest } from '../interfaces/evaluation-request.interface';
import type { EvaluationResult } from '../interfaces/evaluation-result.interface';
import type { EvaluationPromptBuilder } from '../interfaces/evaluation-prompt-builder.interface';

export interface EvaluationParser<T> {
  parse(response: string): {
    score: number;
    reason: string;
    claims: T[];
  };
}

export abstract class AbstractLLMEvaluator<T> {
  constructor(
    @Inject(LLM_TOKEN)
    protected readonly llm: LLM,
  ) {}

  protected abstract metric(): EvaluationMetric;

  protected abstract promptBuilder(): EvaluationPromptBuilder;

  protected abstract parser(): EvaluationParser<T>;

  async evaluate(request: EvaluationRequest): Promise<EvaluationResult<T>> {
    const prompt = this.promptBuilder().build(
      request.question,
      request.context,
      request.answer,
    );

    const response = await this.llm.generateText(prompt);

    const evaluation = this.parser().parse(response);

    return {
      metric: this.metric(),
      score: evaluation.score,
      reason: evaluation.reason,
      claims: evaluation.claims,
    };
  }
}
