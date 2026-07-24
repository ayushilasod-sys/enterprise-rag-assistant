import { Body, Controller, Post } from '@nestjs/common';
import { IngestionService } from '../services/ingestion/ingestion.service';

@Controller('ingestion')
export class IngestionController {
  constructor(private readonly ingestionService: IngestionService) {}

  @Post()
  ingest(@Body() body: { source: string }) {
    return this.ingestionService.ingest(body.source);
  }
}
