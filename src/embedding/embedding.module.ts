import { Module } from '@nestjs/common';

import { EMBEDDING_GENERATOR_TOKEN } from './constants/embedding-generator.constants';
import { GeminiEmbeddingGenerator } from './generators/gemini-embedding.generator';

@Module({
  providers: [
    {
      provide: EMBEDDING_GENERATOR_TOKEN,
      useClass: GeminiEmbeddingGenerator,
    },
  ],
  exports: [EMBEDDING_GENERATOR_TOKEN],
})
export class EmbeddingModule {}
