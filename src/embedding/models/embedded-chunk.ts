import type { DocumentChunk } from '../../ingestion/models/document-chunk';

export interface EmbeddedChunk {
  chunk: DocumentChunk;
  embedding: number[];
}
