import { Injectable } from '@nestjs/common';
import type { EmbeddingGenerator } from '../interfaces/embedding-generator.interface';
import type { DocumentChunk } from '../../ingestion/models/document-chunk';
import type { EmbeddedChunk } from '../../ingestion/models/embedded-chunk';

@Injectable()
export class MockEmbeddingGenerator implements EmbeddingGenerator {
  generateDocumentEmbeddings(
    chunks: DocumentChunk[],
  ): Promise<EmbeddedChunk[]> {
    const embeddedChunks = chunks.map((chunk) => ({
      chunk,
      embedding: this.createMockEmbedding(),
    }));

    return Promise.resolve(embeddedChunks);
  }

  generateQueryEmbedding(_question: string): Promise<number[]> {
    return Promise.resolve(this.createMockEmbedding());
  }

  private createMockEmbedding(): number[] {
    return Array.from({ length: 8 }, () => Math.random());
  }
}
