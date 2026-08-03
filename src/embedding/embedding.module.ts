import { Module } from '@nestjs/common';

import { EMBEDDING_GENERATOR_TOKEN } from './constants/embedding-generator.constants';
import { GeminiEmbeddingGenerator } from '../ai/providers/gemini/gemini.embedding';
import { AiModule } from 'src/ai/ai.module';

@Module({
  imports: [AiModule],
  providers: [
    {
      provide: EMBEDDING_GENERATOR_TOKEN,
      useClass: GeminiEmbeddingGenerator,
    },
  ],
  exports: [EMBEDDING_GENERATOR_TOKEN],
})
export class EmbeddingModule {}
