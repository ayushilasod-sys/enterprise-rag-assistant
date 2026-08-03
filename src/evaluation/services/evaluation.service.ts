import { Injectable } from '@nestjs/common';

import { EvaluationEngine } from './evaluation-engine';
import { EvaluationRequest } from '../interfaces/evaluation-request.interface';

@Injectable()
export class EvaluationService {
  constructor(private readonly engine: EvaluationEngine) {}

  async evaluate(request: EvaluationRequest) {
    return this.engine.evaluate(request);
  }
}
