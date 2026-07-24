import { EmbeddedChunk } from '../../ingestion/models/embedded-chunk';
import { VectorStore } from '../interfaces/vector-store.interface';
import { RetrievedChunk } from '../../chat/models/retrieved-chunk';
import { VectorSearchRequest } from '../models/vector-search-request';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MockVectorStore implements VectorStore {
  private readonly chunks: EmbeddedChunk[] = [];

  store(chunks: EmbeddedChunk[]): Promise<void> {
    this.chunks.push(...chunks);
    return Promise.resolve();
  }

  search(_request: VectorSearchRequest): Promise<RetrievedChunk[]> {
    return Promise.resolve([]);
  }
}
