import { Body, Controller, Post } from '@nestjs/common';

import { EvaluationService } from '../services/evaluation.service';
import { EvaluationRequestDto } from '../dto/evaluation-request.dto';

@Controller('evaluation')
export class EvaluationController {
  constructor(private readonly evaluationService: EvaluationService) {}

  @Post()
  async evaluate(@Body() request: EvaluationRequestDto) {
    return this.evaluationService.evaluate(request);
  }
}
