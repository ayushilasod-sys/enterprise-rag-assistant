import { Injectable } from '@nestjs/common';
import { Pinecone, Index } from '@pinecone-database/pinecone';

import { AppConfigService } from 'src/config/app-config.service';

import type { VectorStore } from '../interfaces/vector-store.interface';
import { EmbeddedChunk } from 'src/embedding/models/embedded-chunk';
import { VectorSearchRequest } from '../models/vector-search-request';
import { RetrievedChunk } from 'src/chat/models/retrieved-chunk';

@Injectable()
export class PineconeVectorStore implements VectorStore {
  private readonly pinecone: Pinecone;
  private readonly index: Index;

  constructor(private readonly appConfig: AppConfigService) {
    this.pinecone = new Pinecone({
      apiKey: this.appConfig.pineconeApiKey,
    });

    this.index = this.pinecone.index(this.appConfig.pineconeIndex);
  }

  async store(chunks: EmbeddedChunk[]): Promise<void> {
    await this.index.upsert({
      records: chunks.map((embeddedChunk) => ({
        id: embeddedChunk.chunk.id,
        values: embeddedChunk.embedding,
        metadata: {
          documentId: embeddedChunk.chunk.documentId,
          content: embeddedChunk.chunk.content,
          pageNumber: embeddedChunk.chunk.pageNumber,
          ...embeddedChunk.chunk.metadata,
        },
      })),
    });
  }

  async search(request: VectorSearchRequest): Promise<RetrievedChunk[]> {
    const response = await this.index.query({
      vector: request.embedding,
      topK: request.topK,
      includeMetadata: true,
    });

    return response.matches.map((match) => ({
      id: match.id,
      content: String(match.metadata?.content ?? ''),
      source: String(match.metadata?.documentId ?? ''),
      pageNumber: Number(match.metadata?.pageNumber ?? 1),
      score: match.score ?? 0,
    }));
  }
}
