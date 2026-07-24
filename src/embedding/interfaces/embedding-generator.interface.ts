import type { DocumentChunk } from '../../ingestion/models/document-chunk';
import type { EmbeddedChunk } from '../models/embedded-chunk';

export interface EmbeddingGenerator {
  generateDocumentEmbeddings(chunks: DocumentChunk[]): Promise<EmbeddedChunk[]>;

  generateQueryEmbedding(question: string): Promise<number[]>;
}
