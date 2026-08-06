import { Module } from '@nestjs/common';

import { EvaluationEngine } from './services/evaluation-engine';
import { EvaluationService } from './services/evaluation.service';

import { GroundednessEvaluator } from './metrics/groundedness/groundedness.evaluator';

import { EVALUATORS } from './constants/evaluators.constants';
import { EvaluationController } from './controllers/evaluation.controller';
import { AiModule } from 'src/ai/ai.module';
import { CorrectnessEvaluator } from './metrics/correctness/correctness.evaluator';
import { HallucinationEvaluator } from './metrics/hallucination/hallucination.evaluator';

@Module({
  imports: [AiModule],
  controllers: [EvaluationController],
  providers: [
    EvaluationEngine,
    EvaluationService,
    GroundednessEvaluator,
    CorrectnessEvaluator,
    HallucinationEvaluator,
    {
      provide: EVALUATORS,
      useFactory: (
        groundedness: GroundednessEvaluator,
        correctness: CorrectnessEvaluator,
        hallucination: HallucinationEvaluator,
      ) => [groundedness, correctness, hallucination],
      inject: [
        GroundednessEvaluator,
        CorrectnessEvaluator,
        HallucinationEvaluator,
      ],
    },
  ],
  exports: [EvaluationService],
})
export class EvaluationModule {}
