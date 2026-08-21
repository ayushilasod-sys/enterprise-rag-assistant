import { AbstractLLMEvaluator } from 'src/evaluation/base/abstract-llm.evaluator';
import { RelevantClaim } from './relevance.types';
import { EvaluationMetric } from 'src/evaluation/interfaces/evaluation-metric.enum';
import { RelevancePromptBuilder } from './relevance.prompt';
import { Injectable } from '@nestjs/common';
import { RelevanceParser } from './relevance.parser';

@Injectable()
export class RelevanceEvaluator extends AbstractLLMEvaluator<RelevantClaim> {
  protected metric(): EvaluationMetric {
    return EvaluationMetric.RELEVANCE;
  }

  protected promptBuilder() {
    return new RelevancePromptBuilder();
  }

  protected parser() {
    return new RelevanceParser();
  }
}
