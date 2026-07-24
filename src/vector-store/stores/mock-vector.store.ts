import { Injectable } from '@nestjs/common';

import type { VectorStore } from '../interfaces/vector-store.interface';
import type { EmbeddedChunk } from '../../embedding/models/embedded-chunk';
import type { RetrievedChunk } from '../../chat/models/retrieved-chunk';
import { VectorSearchRequest } from '../models/vector-search-request';

@Injectable()
export class MockVectorStore implements VectorStore {
  private readonly chunks: EmbeddedChunk[] = [];

  async store(chunks: EmbeddedChunk[]): Promise<void> {
    this.chunks.push(...chunks);
    console.log('Stored chunks in MockVectorStore:', this.chunks);
    return Promise.resolve();
  }

  async search(request: VectorSearchRequest): Promise<RetrievedChunk[]> {
    console.log('Searching in MockVectorStore with request:', request);
    const retrievedChunks = this.chunks
      .slice(0, request.topK)
      .map((embeddedChunk) => ({
        id: embeddedChunk.chunk.id,
        content: embeddedChunk.chunk.content,
        source: embeddedChunk.chunk.documentId,
        pageNumber: embeddedChunk.chunk.pageNumber,
        metadata: embeddedChunk.chunk.metadata,
        score: 1,
      }));

    return Promise.resolve(retrievedChunks);
  }
}
