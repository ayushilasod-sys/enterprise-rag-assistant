import { Module } from '@nestjs/common';

import { EvaluationEngine } from './services/evaluation-engine';
import { EvaluationService } from './services/evaluation.service';

import { GroundednessEvaluator } from './metrics/groundedness/groundedness.evaluator';

import { EVALUATORS } from './constants/evaluators.constants';
import { EvaluationController } from './controllers/evaluation.controller';
import { AiModule } from 'src/ai/ai.module';

@Module({
  imports: [AiModule],
  controllers: [EvaluationController],
  providers: [
    EvaluationEngine,
    EvaluationService,

    GroundednessEvaluator,

    {
      provide: EVALUATORS,
      useFactory: (groundedness: GroundednessEvaluator) => [groundedness],
      inject: [GroundednessEvaluator],
    },
  ],
  exports: [EvaluationService],
})
export class EvaluationModule {}
