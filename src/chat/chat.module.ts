import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { RETRIEVER } from './constants/retriever.constants';
import { PROMPT_BUILDER } from './constants/prompt-builder.constants';
import { DefaultPromptBuilder } from './prompt-builders/default-prompt.builder';
import { DefaultRetriever } from './retrievers/default.retriever';
import { EmbeddingModule } from 'src/embedding/embedding.module';
import { VectorStoreModule } from 'src/vector-store/vector-store.module';
import { AppConfigModule } from 'src/config/app-config.module';
import { AiModule } from 'src/ai/ai.module';

@Module({
  imports: [AppConfigModule, EmbeddingModule, VectorStoreModule, AiModule],
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
  ],
})
export class ChatModule {}
