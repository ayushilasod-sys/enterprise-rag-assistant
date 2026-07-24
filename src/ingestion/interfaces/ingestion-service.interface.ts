import type { IngestionResult } from '../models/ingestion-result';

export interface IngestionService {
  ingest(source: string): Promise<IngestionResult>;
}
