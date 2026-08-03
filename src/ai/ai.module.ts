import { Module } from '@nestjs/common';

import { GeminiLLM } from './providers/gemini/gemini.llm';
import { GeminiEmbeddingGenerator } from './providers/gemini/gemini.embedding';

import { LLM_TOKEN } from './constants/llm.constants';
import { EMBEDDING_GENERATOR_TOKEN } from './constants/embedding.constants';

@Module({
  providers: [
    GeminiLLM,
    GeminiEmbeddingGenerator,

    {
      provide: LLM_TOKEN,
      useExisting: GeminiLLM,
    },

    {
      provide: EMBEDDING_GENERATOR_TOKEN,
      useExisting: GeminiEmbeddingGenerator,
    },
  ],

  exports: [LLM_TOKEN, EMBEDDING_GENERATOR_TOKEN],
})
export class AiModule {}
