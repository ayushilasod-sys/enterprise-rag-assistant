import { Module } from '@nestjs/common';

import { EMBEDDING_GENERATOR_TOKEN } from './constants/embedding-generator.constants';
import { MockEmbeddingGenerator } from './generators/mock-embedding-generator';

@Module({
  providers: [
    {
      provide: EMBEDDING_GENERATOR_TOKEN,
      useClass: MockEmbeddingGenerator,
    },
  ],
  exports: [EMBEDDING_GENERATOR_TOKEN],
})
export class EmbeddingModule {}
