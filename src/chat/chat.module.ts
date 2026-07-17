import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { MockRetriever } from './retrievers/mock.retriever';
import { RETRIEVER } from './constants/retriever.constants';
import { MockLLM } from './llm/mock.llm';
import { LLM_TOKEN } from './constants/llm.constants';
import { PROMPT_BUILDER } from './constants/prompt-builder.constants';
import { DefaultPromptBuilder } from './prompt-builders/default-prompt.builder';

@Module({
  controllers: [ChatController],
  providers: [
    ChatService,

    MockRetriever,
    {
      provide: RETRIEVER,
      useExisting: MockRetriever,
    },

    DefaultPromptBuilder,
    {
      provide: PROMPT_BUILDER,
      useExisting: DefaultPromptBuilder,
    },

    MockLLM,
    {
      provide: LLM_TOKEN,
      useExisting: MockLLM,
    },
  ],
})
export class ChatModule {}
