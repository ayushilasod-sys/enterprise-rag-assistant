import type { EmbeddedChunk } from '../models/embedded-chunk';
import type { RetrievedChunk } from '../../chat/models/retrieved-chunk';

export interface VectorStore {
  store(chunks: EmbeddedChunk[]): Promise<void>;

  search(embedding: number[], topK: number): Promise<RetrievedChunk[]>;
}
