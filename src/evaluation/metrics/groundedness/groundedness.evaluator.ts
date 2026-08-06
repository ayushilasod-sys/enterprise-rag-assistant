import { EvaluationMetric } from 'src/evaluation/interfaces/evaluation-metric.enum';
import { GroundednessParser } from './groundedness.parser';
import { GroundednessPromptBuilder } from './groundedness.prompt';
import { AbstractLLMEvaluator } from 'src/evaluation/base/abstract-llm.evaluator';
import { GroundednessClaim } from './groundedness.types';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GroundednessEvaluator extends AbstractLLMEvaluator<GroundednessClaim> {
  protected metric(): EvaluationMetric {
    return EvaluationMetric.GROUNDEDNESS;
  }

  protected promptBuilder() {
    return new GroundednessPromptBuilder();
  }

  protected parser() {
    return new GroundednessParser();
  }
}
