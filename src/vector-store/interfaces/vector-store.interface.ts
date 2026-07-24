import type { EmbeddedChunk } from '../../embedding/models/embedded-chunk';
import type { RetrievedChunk } from '../../chat/models/retrieved-chunk';
import type { VectorSearchRequest } from '../models/vector-search-request';

export interface VectorStore {
  store(chunks: EmbeddedChunk[]): Promise<void>;

  search(request: VectorSearchRequest): Promise<RetrievedChunk[]>;
}
