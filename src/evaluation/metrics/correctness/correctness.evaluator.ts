import { AbstractLLMEvaluator } from 'src/evaluation/base/abstract-llm.evaluator';
import { CorrectnessParser } from './correctness.parser';
import { CorrectnessPromptBuilder } from './correctness.prompt';
import { CorrectnessClaim } from './correctness.types';
import { EvaluationMetric } from 'src/evaluation/interfaces/evaluation-metric.enum';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CorrectnessEvaluator extends AbstractLLMEvaluator<CorrectnessClaim> {
  protected metric(): EvaluationMetric {
    return EvaluationMetric.CORRECTNESS;
  }

  protected promptBuilder() {
    return new CorrectnessPromptBuilder();
  }

  protected parser() {
    return new CorrectnessParser();
  }
}
