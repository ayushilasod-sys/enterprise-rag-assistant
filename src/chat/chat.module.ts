import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { RETRIEVER } from './constants/retriever.constants';
import { LLM_TOKEN } from './constants/llm.constants';
import { PROMPT_BUILDER } from './constants/prompt-builder.constants';
import { DefaultPromptBuilder } from './prompt-builders/default-prompt.builder';
import { DefaultRetriever } from './retrievers/default.retriever';
import { EmbeddingModule } from 'src/embedding/embedding.module';
import { VectorStoreModule } from 'src/vector-store/vector-store.module';
import { GeminiLLM } from './llm/gemini.llm';
import { AppConfigModule } from 'src/config/app-config.module';

@Module({
  imports: [AppConfigModule, EmbeddingModule, VectorStoreModule],
  controllers: [ChatController],
  providers: [
    ChatService,

    DefaultRetriever,
    {
      provide: RETRIEVER,
      useExisting: DefaultRetriever,
    },

    DefaultPromptBuilder,
    {
      provide: PROMPT_BUILDER,
      useExisting: DefaultPromptBuilder,
    },

    GeminiLLM,
    {
      provide: LLM_TOKEN,
      useExisting: GeminiLLM,
    },
  ],
})
export class ChatModule {}
