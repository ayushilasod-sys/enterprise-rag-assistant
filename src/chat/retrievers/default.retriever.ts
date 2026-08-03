import { Inject, Injectable } from '@nestjs/common';

import type { Retriever } from '../interfaces/retriever.interface';
import type { RetrievedChunk } from '../models/retrieved-chunk';

import type { EmbeddingGenerator } from '../../ai/interfaces/embedding.interface';
import { EMBEDDING_GENERATOR_TOKEN } from '../../embedding/constants/embedding-generator.constants';

import type { VectorStore } from '../../vector-store/interfaces/vector-store.interface';
import { VECTOR_STORE_TOKEN } from '../../vector-store/constants/vector-store.constants';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DefaultRetriever implements Retriever {
  constructor(
    @Inject(EMBEDDING_GENERATOR_TOKEN)
    private readonly embeddingGenerator: EmbeddingGenerator,

    @Inject(VECTOR_STORE_TOKEN)
    private readonly vectorStore: VectorStore,

    private readonly configService: ConfigService,
  ) {}

  async retrieve(question: string): Promise<RetrievedChunk[]> {
    const topK = this.configService.get<number>('topK') ?? 5;

    const embedding =
      await this.embeddingGenerator.generateQueryEmbedding(question);
    console.log('Query Embedding:', embedding);
    return this.vectorStore.search({
      embedding,
      topK,
    });
  }
}
