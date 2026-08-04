import { Module } from '@nestjs/common';

import { EvaluationEngine } from './services/evaluation-engine';
import { EvaluationService } from './services/evaluation.service';

import { GroundednessEvaluator } from './metrics/groundedness/groundedness.evaluator';

import { EVALUATORS } from './constants/evaluators.constants';
import { EvaluationController } from './controllers/evaluation.controller';
import { AiModule } from 'src/ai/ai.module';
import { CorrectnessEvaluator } from './metrics/correctness/correctness.evaluator';

@Module({
  imports: [AiModule],
  controllers: [EvaluationController],
  providers: [
    EvaluationEngine,
    EvaluationService,
    GroundednessEvaluator,
    CorrectnessEvaluator,
    {
      provide: EVALUATORS,
      useFactory: (
        groundedness: GroundednessEvaluator,
        correctness: CorrectnessEvaluator,
      ) => [groundedness, correctness],
      inject: [GroundednessEvaluator, CorrectnessEvaluator],
    },
  ],
  exports: [EvaluationService],
})
export class EvaluationModule {}
