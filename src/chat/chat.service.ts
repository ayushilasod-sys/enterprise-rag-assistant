import { Inject, Injectable } from '@nestjs/common';
import { ChatRequestDto } from './dto/chat-request.dto';
import { ChatResponseDto } from './dto/chat-response.dto';
import { RETRIEVER } from './constants/retriever.constants';
import type { Retriever } from './interfaces/retriever.interface';
import { LLM_TOKEN } from './constants/llm.constants';
import type { LLM } from './interfaces/llm.interface';
import type { PromptBuilder } from './interfaces/prompt-builder.interface';
import { PROMPT_BUILDER } from './constants/prompt-builder.constants';

@Injectable()
export class ChatService {
  constructor(
    @Inject(RETRIEVER)
    private readonly retriever: Retriever,

    @Inject(PROMPT_BUILDER)
    private readonly promptBuilder: PromptBuilder,

    @Inject(LLM_TOKEN)
    private readonly llm: LLM,
  ) {}
  async chat(request: ChatRequestDto): Promise<ChatResponseDto> {
    // 1. Retrieve relevant knowledge
    const chunks = await this.retriever.retrieve(request.question);
    console.log('chunks Length :', chunks.length);
    // 2. Build the prompt
    const prompt = this.promptBuilder.build(request.question, chunks);
    console.log('Prompt:', prompt);
    // 3. Generate the answer
    const answer = await this.llm.generate(prompt);
    console.log('Answer:', answer);
    // 4. Return the API response
    return {
      answer,
    };
  }
}
