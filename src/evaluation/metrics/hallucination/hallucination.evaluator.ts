import { EvaluationMetric } from 'src/evaluation/interfaces/evaluation-metric.enum';
import { HallucinationPromptBuilder } from './hallucination.prompt';
import { HallucinationParser } from './hallucination.parser';
import { AbstractLLMEvaluator } from 'src/evaluation/base/abstract-llm.evaluator';
import { Injectable } from '@nestjs/common';
import { HallucinatedClaim } from './hallucination.types';

@Injectable()
export class HallucinationEvaluator extends AbstractLLMEvaluator<HallucinatedClaim> {
  protected metric(): EvaluationMetric {
    return EvaluationMetric.HALLUCINATION;
  }

  protected promptBuilder() {
    return new HallucinationPromptBuilder();
  }

  protected parser() {
    return new HallucinationParser();
  }
}
