import { Inject, Injectable } from '@nestjs/common';

import type { Retriever } from '../interfaces/retriever.interface';
import type { RetrievedChunk } from '../models/retrieved-chunk';

import type { EmbeddingGenerator } from '../../embedding/interfaces/embedding-generator.interface';
import { EMBEDDING_GENERATOR_TOKEN } from '../../embedding/constants/embedding-generator.constants';

import type { VectorStore } from '../../vector-store/interfaces/vector-store.interface';
import { VECTOR_STORE_TOKEN } from '../../vector-store/constants/vector-store.constants';

const DEFAULT_TOP_K = 5;

@Injectable()
export class DefaultRetriever implements Retriever {
  constructor(
    @Inject(EMBEDDING_GENERATOR_TOKEN)
    private readonly embeddingGenerator: EmbeddingGenerator,

    @Inject(VECTOR_STORE_TOKEN)
    private readonly vectorStore: VectorStore,
  ) {}

  async retrieve(question: string): Promise<RetrievedChunk[]> {
    const embedding =
      await this.embeddingGenerator.generateQueryEmbedding(question);
    console.log('Query Embedding:', embedding);
    return this.vectorStore.search({
      embedding,
      topK: DEFAULT_TOP_K,
    });
  }
}
