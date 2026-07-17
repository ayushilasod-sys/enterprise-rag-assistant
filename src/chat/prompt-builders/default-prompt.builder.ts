import { Injectable } from '@nestjs/common';
import type { PromptBuilder } from '../interfaces/prompt-builder.interface';
import type { Prompt } from '../models/prompt';
import type { RetrievedChunk } from '../models/retrieved-chunk';

@Injectable()
export class DefaultPromptBuilder implements PromptBuilder {
  build(question: string, chunks: RetrievedChunk[]): Prompt {
    const context = chunks.map((chunk) => chunk.content).join('\n\n');

    return {
      messages: [
        {
          role: 'system',
          content:
            'You are an enterprise AI assistant. Answer only using the provided context. If the answer is not available in the context, respond that you do not know.',
        },
        {
          role: 'user',
          content: `Context:
${context}

Question:
${question}`,
        },
      ],
    };
  }
}
